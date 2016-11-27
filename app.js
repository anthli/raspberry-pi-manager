'use strict';

const _ = require('lodash');
const express = require('express');

const constants = require('./utils/constants');
const sysinfo = require('./utils/sysinfo');

const app = express();

// Default port to 3000 if the environment doesn't have one
const port = process.env.PORT || 3000;

// Server static files
app.use(express.static('public'));
app.use('/scripts', express.static('node_modules/jquery/dist/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});

// Dynamically retrieve the command to use based on the route parameter
app.get('/:command', (req, res) => {
  // Isolate the matching command
  let key = _.filter(Object.keys(constants.Command), key => {
    return req.params.command === key.toLowerCase();
  })[0];

  sysinfo.sendInfo(res, constants.Command[key]);
});

// Start up the server
app.listen(port, () => {
  console.log('Listening on port', port);
});