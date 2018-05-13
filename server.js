const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var config = require('./api/config');
const port = config.APP_PORT || 4000;

mongoose.connect(config.DB);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var Routes = require('./api/routes');
app.use('/api', Routes);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.use(express.static(path.join(__dirname, './dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
  console.log(path.join(__dirname))
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});