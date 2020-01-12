const request = require('request');
const cheerio = require('cheerio');
const summary = require('../utils/summary.js');

scraper = (URL) => {
    return new Promise((resolve, reject) => {
        request(URL, (error, response, html) => {
            if (!error && response.statusCode === 200) {

                const $ = cheerio.load(html);
                let paragraph = $('p');
                //Summarized Web Scraper.
<<<<<<< HEAD
                resolve(paragraph.text().split('\. ')[0]);
=======
                resolve(paragraph.text().split('\.')[0].replace("AdvertisementSupported by", ""));
>>>>>>> 22231cb046f584606daf8c70088cade5cf0c6135
            }
        });
    });
};

<<<<<<< HEAD
//const test = async() => {
    //var list = (await scraper("https://www.nytimes.com/2020/01/11/us/politics/iran-trump.html?action=click&module=Top%20Stories&pgtype=Homepage"));
    //console.log(list.text);
//};

//test();
=======
// const test = async() => {
//     var list = (await scraper("https://www.nytimes.com/2020/01/11/us/politics/iran-trump.html?action=click&module=Top%20Stories&pgtype=Homepage"));
//     console.log(list);
// };
//
// test();
>>>>>>> 22231cb046f584606daf8c70088cade5cf0c6135

module.exports = scraper;
