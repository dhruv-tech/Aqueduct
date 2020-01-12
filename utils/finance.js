//this is like an import statement
var AlphaVantageAPI = require('alpha-vantage-cli').AlphaVantageAPI;
//var values = 'Close";
var yourApiKey = 'R4I233ZPP0MRLY35';
var alphaVantageAPI = new AlphaVantageAPI(yourApiKey, 'compact', true);
//
const getFinance = async(company) => {
  return new Promise(async(resolve) => {
    await alphaVantageAPI.getDailyData(company.toUpperCase()).then(dailyData => {
    
      let out = `Stock Data - ${company.toUpperCase()}\n \nDaily Close: ${dailyData[0].Close} \nDaily Open: ${dailyData[0].Open} \nDaily Low: ${dailyData[0].Low}`;
      resolve(out);
    });

  });
}

module.exports = getFinance;
