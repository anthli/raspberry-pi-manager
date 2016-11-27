'use strict';

const _ = require('lodash');
const exec = require('child_process').exec;

const constants = require('./constants');

// Split the data by newline to get each individual output, then split
// the output into key-value pairs and assign them to info
const outputToKeyValue = data => {
  let info = {};
  // Ignore newline values that get parsed to output
  let outputs = data.split('\n').filter(output => output.length > 0);

  _.each(outputs, output => {
    let colonIndex = output.indexOf(':');
    let key = output.substring(0, colonIndex).trim();
    let value = output.substring(colonIndex + 1).trim();
    info[key] = value;
  });

  return info;
};

// Execute the command and send a response back to the client containing the
// output of the execution
module.exports.sendInfo = (res, command) => {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }

    let info = outputToKeyValue(stdout);
    res.json(info);
  });
};