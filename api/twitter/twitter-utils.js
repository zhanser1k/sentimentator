require('dotenv').config();
const Twit = require('twit');
const mongoose = require('mongoose');

const config = require('../config');
const Tweets = require('../models/Tweets');

mongoose.connect(config.DB);

const T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
})
exports.downloadTweets = (trackWords) => {
    let stream = T.stream('statuses/filter', {track: trackWords, language: 'ru'});
    let count = 0;
    stream.on('tweet', (tweet) => {
        Tweets.create({
                text: tweet.text,
                sentiment: 0,
                votedusers: []
            },
            function (error, tweet) {
                if (error) {
                    console.log('Error');
                }
                count += 1;
                console.log(`Success, count ${count}`);
            }
        )
    });
};

exports.getTweetsBySearchText = (searchText, count) => {
    return T.get('search/tweets', { q: searchText, count: count, lang: 'ru', result_type: 'mixed', tweet_mode: 'extended' });
};
