const TwitterClient = require("twitter");

class Twitter {

  constructor() {
    this.client = new TwitterClient({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
  }

  tweet(text) {
    this.client.post("statuses/update", {status: text}, (error, tweet) => {
      if (error)
        console.log(error);
      else
        console.log("Posted tweet: ", tweet.text);
    });
  }

};

module.exports = Twitter;

