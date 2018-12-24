const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

//imort db configuration
const db = require('./config/dbconfig');
// require routes
const api = require('./routes/api');
const secure = require('./routes/secure');

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

// define API routes
app.use('/api', api);
app.use('/secure', secure);

// set all coming requests to go to the react folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// define the port for runnign server
const port = process.env.PORT || 4000;

app.listen(port, function (err) {
  if (err) return err;
  console.log(`App is listening on port ${port}`);
});
