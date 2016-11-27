'use strict';

const socket = io.connect();

socket.on('sys-info', data => {
  $('#hostname').html('./' + data.hostname);
  $('#os').html(data.os);
});

socket.on('sys-uptime', data => {
  $('#uptime').html(data.uptime);
});

socket.on('public-ip', data => {
  $('#ip').html(data.ip);
});

socket.on('cpu-info', data => {
  $('#model').html(data.model);
  $('#architecture').html(data.architecture);
  $('#cpus').html(data.cpus);
  $('#maxMhz').html(data.maxMhz);
  $('#minMhz').html(data.minMhz);
});

socket.on('cpu-usage', data => {
  $('#usage').html(data.usage);
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