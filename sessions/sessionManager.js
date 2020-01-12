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
    expiryworker.init();
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

//Background Worker

// Configuration
const interval = 30000; // 30 mins

// Toolkit
const expiryworker = {}
expiryworker.init = () => {
    expiryworker.loop();
}

expiryworker.loop = () => {
    setInterval(() => {
        expiryworker.now();
    }, interval)
}

expiryworker.now = () => {
    Session.find({}, async (err, docs) => {
        docs.forEach(element => {
            let sessionTime = element.lastInteraction;
            sessionTime.setMinutes(sessionTime.getMinutes() + 30);
            if(sessionTime < Date.now()){
                console.log(element.number);
                Session.findByIdAndRemove(element._id, (err) => {
                    if(err) console.error(err);
                });
            
            }
        });
    });
}

module.exports = sessionManager;