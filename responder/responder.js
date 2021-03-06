// Response Service | Written by Dhruv on 11-01-2020
const engine = require('./engine');
const langs = require('langs');

const responder = {};
const sessionManager = require('../sessions/sessionManager');
const pos = require('pos');
const weather = require('../utils/weather');
const wiki = require('../utils/wikipedia');
const colors = require('colors');
const headlines = require('../scraper/News/currentNews');
const scraper = require('../scraper/scraper');
const translate = require('../utils/translator');
const stock = require('../utils/finance');
const search = require('../utils/googleSearch');

const bot = new engine();
bot.loadDirectory("./responder/.data/").then(async() => {
    bot.sortReplies();
  }).catch((e) => {
    console.trace("Could not find rivescript files", e);
  })

let usernum;
responder.buidReply = async(number, msg) => {

    // Establishing a session.
    usernum = number;
    let vars = await sessionManager.auth(number, "");
    if(vars != '{}') {
        bot.setUservars(number, JSON.parse(vars));
    }

    // Getting Reply from Service.
    let reply = await bot.reply(number, normalize(msg));

    // Save session state
    vars = bot.getUservars(number);
    await sessionManager.auth(number, JSON.stringify(vars));
    // Dispatch reply
    //console.log(colors.cyan(`${reply}`));
    return reply;

}

const normalize = (txt) => {
    let processedtext = [];
    const tagger = new pos.Tagger();
    const tokens = txt.replace(/[^\w\s]|_/g, "").replace(/ {2,}/g, ' ').trim().toLowerCase().split(' ');

    tokens.forEach(token => {
        let tag = tagger.tag([token])[0][1];

        if(tag != 'IN' & tag != 'PP$') {
            processedtext.push(token);
        }
    });
    //console.log(colors.green(`${processedtext.join(' ')}`))
    return processedtext.join(' ');
}

module.exports = responder;

// Middleware
bot.middleware.getWeather = async(input, output) => {
    return new Promise(async(resolve) => {

        let ucity = await bot.getUservar(usernum, 'city');
        
        try{
            output = await weather.get(ucity, "CA");
        } catch(e) {
            output = `Sorry I could not find the weather for ${ucity}`;
        }
 
        resolve(output);
    })
}

bot.middleware.getWiki = async(input, output) => {
    return new Promise(async(resolve) => {

        let subject = await bot.getUservar(usernum, 'subject');
        
        try{
            output = await wiki(subject);
        } catch(e) {
            output = `Sorry I could not find anything for ${input}`;
        }
 
        resolve(output);
    })
}

bot.middleware.getHeadlines = async(input, output) => {
    return new Promise(async(resolve) => {

        try{
            let news = await headlines();
            await bot.setUservar(usernum, "headlines", news);
            output = "Here is the news: \n\n";
            
            for (i = 1; i < news.length; i++) {
                let element = news[i];
                output += `💬 (${i}) ${element.title}\n`;
            }
            output += "\n📰 Powered by NYT\n";
            output += "Please reply with the headline number if you'd like to know details."
        } catch(e) {
            console.log(e);
            output = `Sorry I cannot fetch the news right now 😢. Try later.`;
        }
 
        resolve(output);
    })
}

bot.middleware.getNewsDetails = async(input, output) => {
    return new Promise(async(resolve) => {

        try{
            let news = await bot.getUservar(usernum, 'headlines');
            //console.table(news);
            output = "Here is the news: \n\n";
            
            if(isNaN(input)) {
                resolve(await responder.buidReply(usernum, input));
            } else {
                let focus = news[parseInt(input)];
                output = await scraper(focus.url);
                
            }

        } catch(e) {
            console.log(e);
            output = `Sorry I cannot fetch the news details right now 😢. Try later.`;
        }
 
        resolve(output);
    })
}

bot.middleware.getStock = async(input, output) => {
    return new Promise(async(resolve) => {

        let stockCode = await bot.getUservar(usernum, 'stock');
        
        try{
            output = await stock(stockCode);
        } catch(e) {
            output = `Sorry I could not find stock matching ${stockCode}`;
        }
 
        resolve(output);

    })
}

bot.middleware.search = async(input, output) => {
    return new Promise(async(resolve) => {

        let query = await bot.getUservar(usernum, 'query');
        
        try{
            output = await search(query);
        } catch(e) {
            output = `Sorry, I could not find results for ${query}`;
        }
 
        resolve(output);

    })
}

bot.middleware.translate = async(input, output) => {
    return new Promise(async(resolve) => {

        let target = await bot.getUservar(usernum, 'target');
        let oTarget = target;
        target = target[0].toUpperCase() + target.substr(1).toLowerCase();
        target = langs.where("name", target)['1'];
        //console.log(target);
        let text = await bot.getUservar(usernum, 'text');

        output += `The translation to ${oTarget} is: \n`
        
        try{
            output += await translate(text, 'en', target);
        } catch(e) {
            output = `Sorry, I am unable to translate ${text} to ${oTarget} rn`;
        }
 
        resolve(output);

    });
}