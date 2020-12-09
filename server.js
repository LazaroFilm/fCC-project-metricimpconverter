'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai').expect;
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

const convert = require('./convert');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/api/convert', (req, res) => {
  const input = req.query.input;
  console.log(input)
  const converted = convert(input); // convert.js middleware
  const initNum = converted[0];
  const initUnit = converted[1];
  const returnNum = converted[2];
  const returnUnit = converted[3];
  const initial_Units = converted[4];
  const return_Units = converted[5];
  const error = converted[6]
  const string = `${initNum} ${initial_Units} converts to ${returnNum} ${return_Units}`;
  // console.log(converted);
  console.log(string);
  if (error) {
    res.send(error);
    throw error;
  } else {
    res.json({
      initNum: parseFloat(initNum),
      initUnit,
      returnNum: parseFloat(returnNum),
      returnUnit,
      string
    });
  }
})

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port " + process.env.PORT);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function() {
      try {
        runner.run();
      } catch (e) {
        let error = e;
        console.log('Tests are not valid:');
        console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
