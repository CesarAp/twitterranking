var Twitter = require('twitter');
require('dotenv').config();

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

var params = {screen_name: 'nodejs'};
client.get('statuses/home_timeline', params, function(error, tweets, response) {
  const result = [];
  if (!error) {
    tweets.forEach(tweet => {
      result.push(tweet.user.name);
    });
    console.log(result)
  }
});
