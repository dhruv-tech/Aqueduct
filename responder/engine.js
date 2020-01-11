// Response Engine | Dhruv

const rivescript = require('rivescript');

class engine extends rivescript {
    constructor(options = {utf8:true}) {
        super(options);
        this.middleware = {};
    }

    async reply(user, text){

        let data = await super.reply(user, text);

        data = await this.doMiddleware(user, text, data);

        return data;
    }

    async doMiddleware(user, input, output){
        let event = await super.getUservar(user, 'event');
        await super.setUservar(user, 'event', 'undefined');

        if(event != 'undefined'){
            output = await this.middleware[event](input, output);
        }
        
        return output;
    }
}

module.exports = engine;