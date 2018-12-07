const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// require routes
const api = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

// define API routes
app.use('/api', api);

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