'use strict';

const endpoints = [
  '/sysinfo',
  '/publicip',
  '/cpuinfo'
];

// Write the JSON to HTML where the keys are id attributes in the HTML
const writeJsonToHtml = (json) => {
  _.each(Object.keys(json), key => {
    switch (key) {
      case 'hostname':
        $(`#${key}`).html('./' + json[key]);

        break;

      default:
        $(`#${key}`).html(json[key]);

        break;
    }
  });
};

const requestCpuLoad = () => {
  $.ajax({
    url: '/cpuload',
    dataType: 'json',
    success: (data) => writeJsonToHtml(data),
    complete: setTimeout(requestCpuLoad, 1 * 1000)
  });
};

const requestCpuTemp = () => {
  $.ajax({
    url: '/cputemp',
    dataType: 'json',
    success: (data) => writeJsonToHtml(data),
    complete: setTimeout(requestCpuTemp, 2 * 1000)
  });
};

const requestAvailableMem = () => {
  $.ajax({
    url: '/availablemem',
    dataType: 'json',
    success: (data) => writeJsonToHtml(data),
    complete: setTimeout(requestCpuTemp, 2 * 1000)
  });
};

const requestUptime = () => {
  $.ajax({
    url: '/uptime',
    dataType: 'json',
    success: (data) => writeJsonToHtml(data),
    complete: setTimeout(requestCpuTemp, 60 * 1000)
  });
};

$(document).ready(() => {
  // Request static data
  _.each(endpoints, endpoint => {
    $.ajax({
      url: endpoint,
      dataType: 'json',
      success: (data) => {
        writeJsonToHtml(data);
      }
    });
  });

  requestCpuLoad();
  requestCpuTemp();
  requestAvailableMem();
  requestUptime();
});