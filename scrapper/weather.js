let http = require('http');
const request = require('request');
let weather = {};

//create URL
function createURL(city, countryCode) {
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        ',' +
        countryCode +
        '&units=metric&appid=b6b5bb3ffffbc02bbed71ff418922e39';

    return url;
}

//main
weather.get = (weatherCity, weatherCountryCode) => {
    return new Promise((resolve, reject) => {
        let text;
        request(createURL(weatherCity, weatherCountryCode), function (err, res, body) {
            let data = JSON.parse(body);
            text =
                data['name'] + '\n' + //city name
                'Description: ' + data.weather[0].description + '\n' +  //weather description
                'Temperature: ' + data.main['temp'] + 'C , feels like: ' + data.main['feels_like'] + 'C' + '\n' +  //current temperature
                'High: ' + data.main['temp_max'] + 'C, low: ' + data.main['temp_min'] + 'C'; //daily high/low
            resolve(text);
        });
    });

};

module.exports = weather;

//IN FALLING FUNCTION:
/*
const weather = require('./weather.js');

const test = async() => {
    console.log(await weather.get("Vancouver", "CA"));
};

test();*/
