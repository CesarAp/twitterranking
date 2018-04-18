const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

const params = {screen_name: 'ecesaraparicio'};

const retrieveUserFollowers = () => (
  new Promise(resolve => (
    client.get(
      'followers/list',
      params,
      (error, followers, response) => {
        if (!error) {
          const followersData = followers.users.map(user => (
               {
                 screen_name: user.screen_name,
                 name: user.name,
                 description: user.description,
                 followers_count: user.followers_count,
                 friends_count: user.friends_count,
               }
           ));
           resolve(followersData);
        } else {
          resolve([]);
        }
      }
    )
  ))
);

const retrieveUserTweets = (screen_name) => (
  new Promise(resolve => (
    client.get(
      'statuses/user_timeline',
      { screen_name },
      (error, tweets, response) => {
        if (!error) {
          const userTweets = tweets.map(tweet => tweet.text)
          resolve(userTweets);
        } else {
          resolve([]);
        }
      }
    )
  ))
);

async function retrieveUserData() {
  const followersData = await retrieveUserFollowers();
  const followersTweets = followersData.map(follower => {
    return retrieveUserTweets(follower.screen_name);
  });
  const followerDataWithTweets = await Promise.all(followersTweets).then(tweets => (
    followersData.map((follower, i) => (
      {
        ...follower,
        tweets: tweets[i],
      }
    ))
  ))
  const filterItems = query => {
    return followerDataWithTweets.filter(el =>
    el.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
  }
  // console.log(filterItems('SEO'));
  return followerDataWithTweets
};

// PARA SELECCIONAR KEYWORDS DEL ARRAY
// var wordsString = userData.split(' ');
// console.log(wordsString.length);
// counter = 0;
// for (var i = 0; i < wordsString.length; i++) {
//  if (wordsString[i] === 'de') {
//    counter++;
//  }
// }
//AQUI QUÉ PASA
// console.log(counter);
// var results = [];
// var element = 'SEO';
// var idx = followersData.indexOf(user.screen_name);
// while (idx != -1) {
//   results.push(idx);
//   idx = followersData.indexOf(element, idx + 1);
// }
// console.log(results);
// var followerDataWithTweets
// console.log(followerDataWithTweets.indexOf(SEO));


  retrieveUserData()
    .then(userData => {
      console.log(userData)
    })
    .catch(error => {
      console.log(error)
    })
