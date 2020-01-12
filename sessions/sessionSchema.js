// Session Manager | Dhruv
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    number: {
        type: String,
        required: [true, "Give me your phone number, no choice!"]
    },
    session: {
        type: String,
        default: "{}"
    },
    lastInteraction: {
        type: Date,
        default: Date.now()
    }
});

const Session = mongoose.model('session', sessionSchema);

module.exports = Session;