const request = require('request');

//make an array of current news
getCurrentNews = () =>{
    let news = [];
    let len = 10;
    return new Promise((resolve, reject) => {
        try {
            let url = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=zJx7ZOIQET7yxPeiYAO600BpVwFNgioS';
            request(url, function (err, res, body) {
                let data = JSON.parse(body);
                for (let i = 0; i < len; i++) {

                    news.push({url: data.results[i].url, title: data.results[i].title, date: data.results[i].published_date});
                }
                // console.log(JSON.stringify(news));
                resolve(news);
            });
        } catch (error) {
            reject();
        }

    });
};


/*const test = async() => {
    var list = (await getCurrentNews());
    console.log(list);
};
test();*/

module.exports = getCurrentNews;

