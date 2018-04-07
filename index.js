/*
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'FjE2Jm9nNd4r7BqKzle95G3DV',
  consumer_secret: 'WFpZQYPu6tpSDJOe0TLUZuaPm5mEqhcSOPxbsUvjmfCLRIySLP',
  access_token_key: '981193713425747970-il4tMPCHfk3fQS2mtw58JyiIyk1a1cX',
  access_token_secret: 'KWmrSCBcp7X9fEYJBjIAOyInj55tPbIYHbXdL1HCk1cts'
});

var params = {screen_name: 'nodejs'};
client.get('followers/ids', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
*/

const Twitter = require('twitter');

require('dotenv').config();

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});
// El user está hardcodeado para comprobar
const params = {screen_name: 'eCesarAparicio'};
const urlLink = 'statuses/user_timeline';

client.get(urlLink, params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
