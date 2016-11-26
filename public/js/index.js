'use strict';

const socket = io.connect();

socket.on('sys-info', data => {
  $('#hostname').html(data.hostname);
  $('#os').html(data.os);
});

socket.on('sys-uptime', data => {
  $('#uptime').html(data.uptime);
});

socket.on('public-ip', data => {
  $('#ip').html(data.ip);
});

socket.on('cpu-info', data => {
  console.log(data);
  $('#model').html('Model: ' + data.model);
  $('#architecture').html('Architecture: ' + data.architecture);
  $('#cpus').html('CPUs: ' + data.cpus);
  $('#maxMhz').html('Max MHz: ' + data.maxMhz);
  $('#minMhz').html('Min MHz: ' + data.minMhz);
});

socket.on('cpu-temp', data => {
  $('#temp').html(data.temp);
});

socket.on('total-mem', data => {
  $('#total').html(data.total);
});

socket.on('available-mem', data => {
  $('#available').html(data.available);
});