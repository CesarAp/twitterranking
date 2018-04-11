//Realmente no lo necesito porque son a quienes sigo yo por lo que
// a ellos no se les mostrará mi publicidad
var Twitter = require('twitter');
require('dotenv').config();

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

var params = {screen_name: '@SEOprevilegiado'};
client.get('friends/ids', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
