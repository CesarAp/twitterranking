var Twitter = require('twitter');
require('dotenv').config();

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

// Obtengo ids de los followers para myFollowers.js
var params = {screen_name: 'nodejs'};
client.get('followers/ids', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }

});
