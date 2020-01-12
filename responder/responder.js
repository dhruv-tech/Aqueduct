// Response Service | Written by Dhruv on 11-01-2020
const engine = require('engine');
const franc = require('franc');

const isoMapper = require('iso-639-3-to-1');
const responder = {};
const sessionManger = require('../sessions/sessionManager');

const bot = new engine();
bot.loadDirectory("./.data/").then(async() => {
    bot.sortReplies();
  }).catch((e) => {
    console.trace("Could not find rivescript files", e);
  })

responder.buidReply = async(number, msg) => {

    // Establishing a session
    let vars = await sessionManger(number, "");
    if(vars != '{}') {
        bot.setUservars(number, vars);
    }
    // Capturing Language
    let lang = franc(msg, {minLength: 3});
    lang = isoMapper(lang);

    if(lang != 'en') {
        //msg = translate;
    }

    // Getting Reply from Service.
    let reply = await bot.reply(number, normalize(msg));

    // Translate reply if needed
    if(lang != 'en') {
        reply = translate;
    }

    // Save session state
    vars = bot.getUservars(number);
    await sessionManger(number, vars);
    // Dispatch reply
    return reply;

}

const normalize = (txt) => {
    let processedtext = [];
    const tagger = new pos.Tagger();
    const tokens = txt.replace(/[^\w\s]|_/g, "").replace(/ {2,}/g, ' ').trim().toLowerCase().split(' ');

    tokens.forEach(token => {
        let tag = tagger.tag([token])[0][1];

        if(tag != 'IN' & tag != 'PRP$') {
            processedtext.push(token);
        }
    });
    return processedtext.join(' ');
}
