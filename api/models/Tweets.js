const mongoose = require('mongoose');

const tweets = new mongoose.Schema({
    text: String,
    votedusers: Array,
    sentiment: Number
});

module.exports = mongoose.model('Tweets', tweets);