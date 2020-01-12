const request = require('request');

//initiate news array
function newsobj(url,title,date){
    this.url = url;
    this.title = title;
    this.date = date;
}

function getURL(search){
    ahah = search.replace(/\s/g, "%20");
    URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +
        ahah +
        '&api-key=FXxODTyi1VJr9d4Wjhfyx8z73yaaeuGk';
    return URL;
}

getSearchNews = (searchTerm) =>{
    let news = [];
    let len = 10;
    return new Promise((resolve, reject) => {
        request(getURL(searchTerm), function (err, res, body) {
            let data = JSON.parse(body);
            for (let i = 0; i < len; i++) {
                news.push(new newsobj(data.response.docs[i].web_url, data.response.docs[i].headline.main, data.response.docs[i].pub_date.substr(0, 10)));
            }
            resolve(news);
        });
    });
};

/*
const test = async() => {
    var list = (await getCurrentNews());
};
test();*/

/*const test = async() => {
    var list = (await getSearchNews('vancouver'));
    console.log(list[0].date);
};
test();*/

module.exports = getSearchNews;
