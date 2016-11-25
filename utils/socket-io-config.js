'use strict';

const _ = require('lodash');
const io = require('socket.io');

const constants = require('./constants');
const sysinfo = require('./sysinfo');

// Configure socket.io on the given server
module.exports = server => {
  const listener = io.listen(server);

  listener.on('connection', socket => {
    // Initial sending of information
    _.each(Object.keys(constants.SocketEvent), key => {
      sysinfo.sendInfo(
        socket,
        constants.Command[key],
        constants.SocketEvent[key]
      );
    });

    // Send the CPU temperatures, free and available memory at intervals of 3
    // seconds
    setInterval(() => {
      sysinfo.sendInfo(
        socket,
        constants.Command.CpuTemp,
        constants.SocketEvent.CpuTemp
      );

      sysinfo.sendInfo(
        socket,
        constants.Command.FreeAvailableMem,
        constants.SocketEvent.FreeAvailableMem
      );
    }, 3000);

    // Send the uptime at intervals of 1 minute
    setInterval(() => {
      sysinfo.sendInfo(
        socket,
        constants.Command.SysUptime,
        constants.SocketEvent.SysUptime
      );
    }, 60000);
  });
};