const requestPromise = require('request-promise');
const summarizer = require('./summary.js');



// Look-up function for Wikipedia, 
const lookup = (query) => {
    return new Promise(resolve => {
        var topic = sanitize(query);
        var URL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&exintro&explaintext&generator=search&gsrsearch=intitle:"+topic+"&gsrlimit=1&redirects=1";

        var options={
            method: 'GET',
            uri:URL,
            json:true
        };

        requestPromise(options).then(function(parsebody){
            try {
                for (var attribute in parsebody.query.pages){
                    // console.log(attribute);
                    // console.log(parsebody.query.pages[attribute].extract);
                    if (attribute != null) {
                        var value = parsebody.query.pages[attribute].extract.split('\.', 10);
                        
                        let count = 0;
                        let pos = 0;
                        let res = "";
                        let limit = 3;
                        while (count < limit) {
                            
                            if(value[pos].length > 1) {
                                if (pos != 0) res += `.`; 
                                res += ` ${value[pos]}`;
                                pos++;
                                count++;
                                if (value[pos].length == 1) limit++;
                            } else {
                                res += `.${value[pos]}`;
                                pos++;
                            }
                        }

                        resolve(res);
                    }
                }
            } catch (error) {
                console.error(error);
                resolve("Sorry, I am not sure 😢");
            }
            // console.log(parsebody.query);
            // console.log(parsebody.query.pages[1]);
        });
    });
};

//
// const test = async () => {
//   console.log(await  lookup("Leonardo Da Vinci"));
// };

//Sanitizes the string
function sanitize(string){
    string = string.replace(/\s/g, "%20");
    return string;
}

//export function
module.exports = lookup;


