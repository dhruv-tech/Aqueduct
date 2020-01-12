//this is like an import statement
var AlphaVantageAPI = require('alpha-vantage-cli').AlphaVantageAPI;
//var values = 'Close";
var yourApiKey = 'LT94QSBCP5ZK2E19';
var alphaVantageAPI = new AlphaVantageAPI(yourApiKey, 'compact', true);
//
 function getFinance (company, info)
{
alphaVantageAPI.getDailyData(company)
    .then(dailyData => {
      if(info==("Close"))
      {
        console.log("Daily close: "+dailyData[0].Close);
        //console.log(dailyData[0].Close);
      }
      if(info==("Open"))
      {
      console.log("Daily Open: "+dailyData[0].Open);
        //console.log(dailyData[0].Open);
      }
      if(info==("Low"))
      {
        console.log("Daily Low: "+dailyData[0].Low);
        //console.log(dailyData[0].Low);
      }
   })
  //  .catch(err => {
  //      console.error(err);
  //  });
}

getFinance("MSFT", "Open");
