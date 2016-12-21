'use strict';

const _ = require('lodash');
const exec = require('child_process').exec;

// Execute the command and send a response back to the client containing the
// output of the execution
module.exports.sendInfo = (res, command) => {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(err);

      return;
    }

    let info = {};

    _.each(stdout.split('\n'), line => {
      if (line.length > 0) {
        info = JSON.parse(line);
      }
    });

    res.json(info);
  });
};