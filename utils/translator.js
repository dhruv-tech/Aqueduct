var googleTranslate = require('google-translate')("AIzaSyBBLY1xs-8NPFHObGk7jqf7lPBPHOCTC-8", {});
function translate(text, languageFrom, languageTo)
{
  //if you use resolve, the computer will wait
  return new Promise((resolve) => {
    googleTranslate.translate(text, languageFrom, languageTo, function(err, translation) {
      resolve(translation.translatedText);
    });
});
}
