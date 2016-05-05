var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.json())

//Testing
app.get('/hello', function(req, res){
	res.send('world!')
})


//Verifying
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'super-secret-rob') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})

var token = "PLEASE DONT STEAL MY KEY PUT YOUR OWN HERE <3";

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}



//Functions
app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      // Handle a text message from this sender
      console.log(text);
      if (text === "What is your name") {
      	sendTextMessage(sender, "My name is Jarvis! ");
      } else if (text === "What is my name") {
      	sendTextMessage(sender, "SUPREME OVERLORD OF THE GALAX- Erhm I mean Robert");
      } else if (text === "Tell me a joke") {
      	sendTextMessage(sender, "I went to the Zoo yesterday, but there was only one dog. I guess you can say it was a Shit Tzu!");
      } else if (text === "Tell me another joke") {
      	sendTextMessage(sender, "I'm so good at sleeping that I can even do it with my eyes closed! Just kidding I don't have eyes!");
      } else if (text === "How are you") {
      	sendTextMessage(sender, "I am not programmed to have feelings :'(");
      } else {
      	sendTextMessage(sender, text.substring(0, 200));
      } 
      
    } 
  
    
  }
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000)