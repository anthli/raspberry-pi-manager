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
    sysinfo.sendInfo(socket, constants.SocketEvent.SysInfo);
    sysinfo.sendInfo(socket, constants.SocketEvent.CpuInfo);
    sysinfo.sendInfo(socket, constants.SocketEvent.MemInfo);

    setInterval(() => {
      sysinfo.sendInfo(socket, constants.SocketEvent.SysInfo);
      sysinfo.sendInfo(socket, constants.SocketEvent.CpuInfo);
      sysinfo.sendInfo(socket, constants.SocketEvent.MemInfo);
    });
  });
};