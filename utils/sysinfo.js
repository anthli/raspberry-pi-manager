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

  let test = _.map(outputs, output => {
    let colonIndex = output.indexOf(':');
    let key = output.substring(0, colonIndex).trim();
    let value = output.substring(colonIndex + 1).trim();
    info[key] = value;
  });

  return info;
}

// Get the information based on the event and send it over the given socket
module.exports.sendInfo = (socket, event) => {
  // Determine which command to execute
  let command;
  switch (event) {
    // System information
    case constants.SocketEvent.SysInfo:
      command = constants.Command.SysInfo;
      break;

    // CPU information
    case constants.SocketEvent.CpuInfo:
      command = constants.Command.CpuInfo;
      break;

    // Memory information
    case constants.SocketEvent.MemInfo:
      command = constants.Command.MemInfo;
      break;
  }

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }

    let info = outputToKeyValue(stdout);
    socket.emit(event, info);
  });
};