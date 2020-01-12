const request = require('request');

//initiate news array
function newsobj(url,title,date){
    this.url = url;
    this.title = title;
    this.date = date;
}
//make an array of current news
getCurrentNews = () =>{
    let news = [];
    let len = 10;
    return new Promise((resolve, reject) => {
        let url = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=FXxODTyi1VJr9d4Wjhfyx8z73yaaeuGk';
        request(url, function (err, res, body) {
            let data = JSON.parse(body);
            for (let i = 0; i < len; i++) {
                news.push(new newsobj(data.results[i].url, data.results[i].title, data.results[i].published_date));
            }
            // console.log(JSON.stringify(news));
            resolve(news);
        });
    });
};

/*
const test = async() => {
    var list = (await getCurrentNews());
};
test();*/

module.exports = getCurrentNews;

