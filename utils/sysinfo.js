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

// Execuse the command and send its output over the socket on the event
module.exports.sendInfo = (socket, command, event) => {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }

    let info = outputToKeyValue(stdout);
    socket.emit(event, info);
  });
};