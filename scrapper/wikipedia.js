const requestPromise = require('request-promise');



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
            // console.log(parsebody.query);
            // console.log(parsebody.query.pages[1]);
            for (var attribute in parsebody.query.pages){
                // console.log(attribute);
                // console.log(parsebody.query.pages[attribute].extract);
                if (attribute != null) {
                    resolve(parsebody.query.pages[attribute].extract);
                }
            }
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


