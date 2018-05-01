const mongoose = require('mongoose')

const tweetData = new mongoose.Schema({
    text: String,
    sentiment: Number
});

module.exports = mongoose.model('TweetData', tweetData)