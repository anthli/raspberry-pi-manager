'use strict';

let cpuLoadChart;

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
    success: (data) => {
      let series = cpuLoadChart.series[0];
      let shift = series.data.length > 10;
      let date = new Date().getTime();
      series.addPoint([date, data.load], true, shift);
    },
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

  // Don't use UTC time for time axes
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  cpuLoadChart = new Highcharts.Chart({
    chart: {
      renderTo: 'load',
      type: 'spline',
      events: {
        load: requestCpuLoad
      }
    },

    title: '',

    legend: false,

    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150,
      maxZoom: 20 * 1000
    },

    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      labels: {
        format: '{value: 0.1f}'
      },
      title: {
        text: 'Temperature (\xB0C)',
        margin: 80
      }
    },

    series: [{
      name: 'Random data',
      data: []
    }]
  });
});