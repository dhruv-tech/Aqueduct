const googleIt = require('google-it');

var google = function(query){
    return new Promise((resolve, reject) => {
        googleIt({
            'query': query,
            'limit': '5',
            'disableConsole ': true
        }).then(results => {
            var finalString = "";
            for (var i = 0; i < results.length; i++){
                finalString = finalString+"🔍 "+results[i].title+"\n"+
                    "📃 "+results[i].snippet+"\n";
            }

            // console.log(results);
            resolve(finalString);

        }).catch(e => {
            reject("Sorry I don't know");
        });
    });
};

/*const test = async() => {
    console.log(await google("cow"));
};

test();*/

module.exports = google;