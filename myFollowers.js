var Twitter = require('twitter');
require('dotenv').config();

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

// Obtengo ids de los followers para myFollowers.js
var params = {screen_name: '@eCesarAparicio'};
client.get('followers/ids', params)
  .then(followers => {
    const allUsers = [];
    followers.ids.forEach(followerId => {
      allUsers.push(getUserInfo(followerId));
    });
    return Promise.all(allUsers)
    //return allUsers[0]
  })
  .then(response => console.log(response))
  .catch(err => console.log(err))

// params = {
//   //¿Cómo lo meto sin harcodear?
//   user_id: 2775266938
// }
function getUserInfo(userId) {
  const params = {
    user_id: userId
  }
  return client.get('statuses/user_timeline', params)
}
//https://developer.twitter.com/en/docs/tweets/filter-realtime/api-reference/post-statuses-filter.html
// Tengo que sacar las IDS, luego meterlas en user_id:, luego sacar descriptions
// y text de cada usuario, una vez que sepa estos últimos datos de texto, tengo
// que ver si tiene las keywords (lo suyo sería meter tfidf). Si tiene las
// keywords, me quedo con esos
// que dan un número determinado de usuarios, por ejemplo 250 (por suponer, me
// quedo con 250 y descarto 130). Luego y por último ése número será el
// denominador de la fórmula, siendo index.js el numerador. Por último y para
// afinar lo suyo sería filtrar por idioma, etc.
