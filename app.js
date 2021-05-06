const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const responder = require('./responder/responder');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', async (req, res) => {
    const twiml = new MessagingResponse();

    req.body = {};
    req.body.Body = 'stock msft';
    req.body.From = "+17789569471";
    if (req.body.Body != null) { //Check if response is not null, if it isn't then we delegate to the handler
        var number = req.body.From;
        let msg = await responder.buidReply(req.body.From, req.body.Body);
        twiml.message(msg);
    } else {
        twiml.message(
            'Sorry something went wrong, please try again later'
        );
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

http.createServer(app).listen(process.env.PORT || 8080, () => {
    console.log('Listen on defualt port');
});