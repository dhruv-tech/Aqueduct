const googleIt = require('google-it');

var google = function(query){
    return new Promise((resolve, reject) => {
        googleIt({
            'query': query,
            'limit': '5',
            'disableConsole ': true
        }).then(results => {
            // console.log(results);
            resolve(results);

        }).catch(e => {
            reject("Sorry I don't know");
        });
    });
};

// const test = async() => {
//     console.log(await google("cow"));
// };
//
// test();

module.exports = google;