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
                resolve(summary(paragraph.text(), 14, 17));
            }
        });
    });
};

const test = async() => {
    var list = (await scraper("https://www.nytimes.com/2020/01/11/us/politics/iran-trump.html?action=click&module=Top%20Stories&pgtype=Homepage"));
    console.log(list.text);
};

test();

module.exports = scraper;
