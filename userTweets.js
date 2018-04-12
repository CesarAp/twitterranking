client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    const allTweets = tweets.map(tweet => tweet.text);
    console.log(allTweets)
  }
});
