const Twitter = require('twitter');
require('dotenv').config();
var petitionCounter = 0;

const client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

const retrieveUserFollowers = usr => (
    new Promise(resolve => (
        client.get(
            'followers/list',
            {screen_name: usr},
            (error, followers, response) => {
                petitionCounter++;
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
                    console.log(error);
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
              petitionCounter++;
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

async function retrieveUserData(usr) {
    const followersData = await retrieveUserFollowers(usr);
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


var usuario = 'seoprevilegiado'
//var usuario = 'sicodeandres '
retrieveUserData(usuario)
    .then(userData => {
        if (userData.length > 0) {
            var totales = userData.length
            const filterItems = query => {
                return userData.filter(el =>
                    el.description.toLowerCase().indexOf(query.toLowerCase()) > -1 || el.tweets.filter(t => t.toLowerCase().indexOf(query.toLowerCase()) > -1).length > 0
                );
            }
            var filtrados = filterItems('SEO');
            var reales = filtrados.length;
            var myscore = (totales - reales)/totales;
            //console.log(userData)
            //console.log("My score: "+myscore);

            var res = userData.map( fllwr => {
                //console.log("Recuperando followers de "+fllwr.screen_name)
                return retrieveUserData(fllwr.screen_name).then(ud => {
                    var totales = ud.length
                    const filterItems = query => {
                        return ud.filter(el =>
                            el.description.toLowerCase().indexOf(query.toLowerCase()) > -1 || el.tweets.filter(t => t.toLowerCase().indexOf(query.toLowerCase()) > -1).length > 0
                        );
                    }
                    var filtrados = filterItems('SEO');
                    var reales = filtrados.length;
                    var fllw_score = reales/totales;
                    return fllw_score;
                })
            });
            Promise.all(res).then(values => {
                var v = values.filter(Boolean);
                var sum_scores = v.reduce(function(valorAnterior, valorActual, indice, vector){
                    return valorAnterior + valorActual;
                });
                var score_total = sum_scores/v.length * myscore
                console.log("Score total del usuario "+usuario+": "+score_total);
                console.log(petitionCounter)
            })
        } else {
            console.log("No hay datos del usuario "+usuario)
            console.log(petitionCounter)
        }
    }
    )
    .catch(error => {
        console.log(error)
    })
