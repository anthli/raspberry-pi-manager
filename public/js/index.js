'use strict';

let requestUptime;
let requestCpuLoad;
let requestCpuTemp;
let requestAvailableMem;

// Request static data
$.ajax({
  url: '/sysinfo',
  dataType: 'json',
  success: (data) => {
    $('#hostname').html('./' + data.hostname);
    $('#os').html(data.os);
    $('#total').html(data.total);
  }
});

$.ajax({
  url: '/publicip',
  dataType: 'json',
  success: (data) => {
    $('#ip').html(data.ip);
  }
});

$.ajax({
  url: '/cpuinfo',
  dataType: 'json',
  success: (data) => {
    $('#model').html(data.model);
    $('#architecture').html(data.architecture);
    $('#cpus').html(data.cpus);
    $('#maxMhz').html(data.maxMhz);
    $('#minMhz').html(data.minMhz);
  }
});

// Call and assign the AJAX requests so that they can be called again at certain
// intervals
(requestCpuLoad = () => {
  $.ajax({
    url: '/cpuload',
    dataType: 'json',
    success: (data) => {
      $('#load').html(data.load);
    }
  });
})();

(requestCpuTemp = () => {
  $.ajax({
    url: '/cputemp',
    dataType: 'json',
    success: (data) => {
      $('#temp').html(data.temp);
    }
  });
})();

(requestAvailableMem = () => {
  $.ajax({
    url: '/availablemem',
    dataType: 'json',
    success: (data) => {
      $('#available').html(data.available);
    }
  });
})();

(requestUptime = () => {
  $.ajax({
    url: '/uptime',
    dataType: 'json',
    success: (data) => {
      $('#uptime').html(data.uptime);
    }
  });
})();

// Call the assigned AJAX requests
setInterval(() => {
  requestCpuLoad();
}, 1000);

setInterval(() => {
  requestCpuTemp();
  requestAvailableMem();
}, 2000);

setInterval(() => {
  requestUptime();
}, 60000);