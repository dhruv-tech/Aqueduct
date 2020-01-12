// Session Manager | Dhruv
const mongoose = require('mongoose');
const colors = require('colors');

const Session = require('./sessionSchema');

console.log('[MongoDB] Establishing connection...'.brightYellow);
mongoose.connect('mongodb+srv://dbuser:dbuser123@cluster0-nkqsk.mongodb.net/aqueduct?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let connection = mongoose.connection;

connection.once('open', async() => {
    console.log('[MongoDB] Connected!'.brightGreen);
    let session = new Session();
    session.number = "9899233217";
    session.save(function (err) {
        if(err){
            console.log(err);
        }
        Session.find({number: "9899233216"}, function (err, docs) {
            
        }); 
    });
});

let sessionManager = {};

sessionManager.auth = async(num, sess) => {
    return new Promise(async(resolve, reject) => {
        Session.find({number: num}, async (err, docs) => {
            if(docs.length == 0){
                let session = new Session();
                session.number = num;
                session.save(function (err) {
                    if(err){ reject(); }
                    else {resolve("{}");}
                });
            } else if (err) {
                reject();
            } else {
                if(sess != "") {
                   await Session.updateOne({ number: num }, { session: sess });
                   resolve(sess);
                } else {
                    resolve(docs[0].session);
                }
            }
        });
    });
}

module.exports = sessionManager;