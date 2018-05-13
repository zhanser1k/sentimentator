const express = require('express');
const router = express.Router();
const Tweets = require('./models/Tweets');
const PythonShell = require('python-shell');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const checkAuth = require('./middleware/check-auth');
const Users = require('./models/Users');
const twitterUtils = require('./twitter/twitter-utils');

PythonShell.defaultOptions = { scriptPath: 'cnn' };

function classifyTweets(text, callback) {
  let options = {
    mode: 'text',
    pythonPath: 'cnn/venv/bin/python3.5',
    args: ['-s', text]
  };
  PythonShell.run('eval.py', options, (err, results) => {
    if (err) throw err;
    callback(results[0]);
  });
}

function getPositiveTweetsPercent(tweetsCount, positivesCount) {
  return positivesCount * 100 / tweetsCount;
}

// router.route('/tweets').get((req, res) => {
//   Tweets.find((err, tweets) => {
//     if (err) {
//       return next(new Error(err));
//     }
//     res.json(tweets);
//   });
// });

router.route('/vote/:id').post((req, res) => {
  var id = req.params.id
  Tweets.findById(id, (error, tweet) => {
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

router.post('/classify',checkAuth, (req, res, next) => { 
  classifyTweets(req.body.text, (result) => {
    result = JSON.parse(result);
    res.json(result);
  });
});

router.post('/signup', (req, res) => {
  Users.find( {username: req.body.username} )
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Пользователь с таким именем уже существует"
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          const user = new Users({
            username: req.body.username,
            password: hash
          });

          user.save().then(result => {
            res.status(200).json({
              message: 'Регистрация успешно завершена'
            })
          }).catch(error => {
            res.status(500).json({
              error: error
            });
          });
        }
      });
    }
  });
});

router.post('/signin', (req, res) => {
  Users.findOne({ username: req.body.username })
  .then(user => {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          failed: "Unauthorized access"
        });
      } else {
        const JWTToken = jwt.sign({
          username: user.username
        }, "secret", {
          expiresIn: "24h"
        });

        return res.status(200).json({
          message: "Authenticated",
          token: JWTToken
        });
      }
    });
  }).catch(error => {
    res.status(401).json({
      message: "Неправильный логин или пароль"
    });
  });
});

router.post('/tweets',checkAuth, (req, res, next) => {
  let count = req.body.count;
  twitterUtils.getTweetsBySearchText(req.body.searchText, count)
    .then((result) => {
      let tweetsToAnalyze = [];
      result.data.statuses.forEach((tweet) => {
          tweetsToAnalyze.push(tweet.full_text);
      });
      classifyTweets(tweetsToAnalyze.join('|'), (results) => {
        results = JSON.parse(results);
        console.log(results)
        let tweets = [];
        let positiveTweetsCount = 0;
        results.forEach((result) => {
          tweets.push(result);
          positiveTweetsCount += result.sentiment;
        });
        let positiveTweetsPercent = getPositiveTweetsPercent(count, positiveTweetsCount);
        let negativeTweetsPercent = 100 - positiveTweetsPercent;
        let tweetsSentimentInfo = {
            tweets,
            info: {
              count,
              positiveTweetsPercent,
              negativeTweetsPercent
            }
        }
        return res.json(tweetsSentimentInfo);
      });
    })
    .catch(err => {
      console.log(err.stack);
    })
});

module.exports = router