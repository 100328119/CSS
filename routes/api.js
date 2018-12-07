const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');

// Listen to React request and send relative data back to react
router.get('/getData', function (req, res) {

  let apiResults = {
    success: false
  };

  // allow cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.send(apiResults);
});

module.exports = router;