'use strict';

const _ = require('lodash');
const express = require('express');

const constants = require('./utils/constants');
const sysinfo = require('./utils/sysinfo');

const app = express();

const dir = __dirname;
const port = process.env.PORT || 4000;

// Server static files
app.use(express.static(constants.PublicDir));
app.use('/dist', express.static(constants.DistDir));

app.get('/', (req, res) => {
  res.sendFile(constants.IndexHtml);
});

// Dynamically retrieve the command to use based on the route
app.get('/:command', (req, res) => {
  // Isolate the command that matches the route by removing all hyphens
  let command = req.params.command.replace(/-/g, '');
  let key = _.filter(Object.keys(constants.Command), key => {
    return key.toLowerCase() === command;
  })[0];

  sysinfo.sendInfo(res, constants.Command[key]);
});

// Start up the server
app.listen(port, () => {
  console.log('Listening on port', port);
});