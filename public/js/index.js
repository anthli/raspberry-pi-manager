'use strict';

let cpuLoadChart;
let cpuTempChart;
let memUsageChart;

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
      let shift = series.data.length > 20;
      let date = new Date().getTime();
      series.addPoint([date, data.load * 1], true, shift);
    },
    complete: setTimeout(requestCpuLoad, 1 * 1000)
  });
};

const requestCpuTemp = () => {
  $.ajax({
    url: '/cputemp',
    dataType: 'json',
    success: (data) => {
      let series = cpuTempChart.series[0];
      let shift = series.data.length > 20;
      let date = new Date().getTime();
      series.addPoint([date, data.temp * 1], true, shift);
    },
    complete: setTimeout(requestCpuTemp, 1 * 1000)
  });
};

const requestMemUsage = () => {
  $.ajax({
    url: '/memusage',
    dataType: 'json',
    success: (data) => {
      console.log(data);
      // let series = memUsageChart.series[0];
      // let shift = series.data.length > 20;
      // let date = new Date().getTime();
      // series.addPoint([date, data.available * 1], true, shift);
    },
    complete: setTimeout(requestMemUsage, 1 * 1000)
  });
};

// Request the uptime every minute
(() => {
  $.ajax({
    url: '/uptime',
    dataType: 'json',
    success: (data) => writeJsonToHtml(data),
    complete: setTimeout(this, 60 * 1000)
  });
})();

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

  // Highcharts configuration

  // Don't use UTC time for time axes
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  // CPU Load chart
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

    plotOptions: {
      spline: {
        enableMouseTracking: false,
        marker: {
          enabled: false
        }
      }
    },

    tooltip: {
      enabled: false
    },

    xAxis: {
      type: 'datetime',
      tickPixelInterval: 100,
      maxZoom: 20 * 1000
    },

    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      labels: {
        format: '{value: 1.0f}'
      },
      title: {
        text: 'Load (%)'
      }
    },

    series: [{
      color: '#76a833',
      data: []
    }]
  });

  // CPU temperature chart
  cpuTempChart = new Highcharts.Chart({
    chart: {
      renderTo: 'temp',
      type: 'spline',
      events: {
        load: requestCpuTemp
      }
    },

    title: '',
    legend: false,

    plotOptions: {
      spline: {
        enableMouseTracking: false,
        marker: {
          enabled: false
        }
      }
    },

    tooltip: {
      enabled: false
    },

    xAxis: {
      type: 'datetime',
      tickPixelInterval: 100,
      maxZoom: 20 * 1000
    },

    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      labels: {
        format: '{value: 1.0f}'
      },
      title: {
        text: 'Temperature (\xB0C)'
      }
    },

    series: [{
      color: '#ba1744',
      data: []
    }]
  });
});