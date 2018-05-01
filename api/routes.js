const express = require('express');
const tweetRoutes = express.Router();
const TweetData = require('./TweetData');
const PythonShell = require('python-shell');
PythonShell.defaultOptions = { scriptPath: 'cnn' };

tweetRoutes.route('/tweets').get((req, res) => {
  TweetData.find((err, tweets) => {
    if (err) {
      return next(new Error(err));
    }
    res.json(tweets);
  });
});

tweetRoutes.route('/vote/:id').post((req, res) => {
  var id = req.params.id
  TweetData.findById(id, (error, tweet) => {
    if (error) {
      return next(new Error('Tweet was not found'))
    } else {
        tweet.sentiment = req.body.vote;
        tweet.save({
            function (error, tweet) {
            if (error) {
                res.status(400).send('Unable to vote');
            } else {
                res.status(200).json(tweet);
            }
            }
        });
    }
  });
});

tweetRoutes.route('/classify').post((req, res, next) => {
  let options = {
    mode: 'text',
    pythonPath: 'cnn/venv/bin/python3.6',
    args: ['-s', req.body.text]
  };
  PythonShell.run('eval.py', options, (err, results) => {
    if (err) throw err;
    res.json({"result": results[0]});
  });
});

module.exports = tweetRoutes