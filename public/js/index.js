'use strict';

const socket = io.connect();

socket.on('sysinfo', data => {
  console.log(data);
});

socket.on('cpuinfo', data => {
  console.log(data);
});

socket.on('meminfo', data => {
  console.log(data);
});