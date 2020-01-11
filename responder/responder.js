// Response Service | Written by Dhruv on 11-01-2020
const engine = require(engine);
const responder = {};

const bot = new engine();
bot.loadDirectory("./.data/").then(async() => {
    bot.sortReplies();
  }).catch((e) => {
    console.trace("Could not find rivescript files", e);
  })

responder.buidReply = async(number, msg) => {

    // Establishing a session 
    // Capturing Language
    // Getting Reply from Service.
    // Translate if needed
    // Save session state
    // Dispatch reply

}