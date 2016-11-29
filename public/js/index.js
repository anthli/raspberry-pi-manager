'use strict';

let cpuUsageChart;
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

const requestCpuUsage = () => {
  $.ajax({
    url: '/cpu-usage',
    dataType: 'json',
    success: (data) => {
      let series = cpuUsageChart.series[0];
      let shift = series.data.length > 20;
      let date = new Date().getTime();
      series.addPoint([date, data.cpuUsage * 1], true, shift);
    },
    complete: setTimeout(requestCpuUsage, 1 * 1000)
  });
};

const requestCpuTemp = () => {
  $.ajax({
    url: '/cpu-temp',
    dataType: 'json',
    success: (data) => {
      let series = cpuTempChart.series[0];
      let shift = series.data.length > 20;
      let date = new Date().getTime();
      series.addPoint([date, data.cpuTemp * 1], true, shift);
    },
    complete: setTimeout(requestCpuTemp, 1 * 1000)
  });
};

const requestMemUsage = () => {
  $.ajax({
    url: '/mem-usage',
    dataType: 'json',
    success: (data) => {
      memUsageChart.series[0].setData([
        {
          y: Math.round(data.freeMem / 1000)
        },
        {
          y: Math.round(data.usedMem / 1000)
        },
        {
          y: Math.round(data.bufferedMem / 1000)
        },
        {
          y: Math.round(data.cachedMem / 1000)
        }
      ]);
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

  // CPU Usage chart
  cpuUsageChart = new Highcharts.chart('cpuUsage', {
    chart: {
      type: 'spline',
      events: {
        load: requestCpuUsage
      }
    },
    title: '',
    legend: false,
    credits: {
      enabled: false
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '{point.y}',
      valueSuffix: '%'
    },
    xAxis: {
      type: 'datetime',
      minRange: 20,
      labels: {
        format: '{value: %H:%M:%S}'
      },
      title: {
        text: 'Time'
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: 'Usage (%)'
      }
    },
    series: [{
      name: 'Usage',
      color: '#76a833',
      data: []
    }]
  });

  // CPU temperature chart
  cpuTempChart = new Highcharts.chart('cpuTemp', {
    chart: {
      type: 'spline',
      events: {
        load: requestCpuTemp
      }
    },
    title: '',
    legend: false,
    credits: {
      enabled: false
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    tooltip: {
      valueSuffix: '\xB0C',
      headerFormat: '',
      pointFormat: '{point.y}'
    },
    xAxis: {
      type: 'datetime',
      minRange: 20,
      labels: {
        format: '{value: %H:%M:%S}'
      },
      title: {
        text: 'Time'
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: 'Temperature (\xB0C)'
      }
    },
    series: [{
      name: 'Temp',
      color: '#ba1744',
      data: []
    }]
  });

  // Memory usage chart
  memUsageChart = new Highcharts.chart('memUsage', {
    chart: {
      type: 'column',
      events: {
        load: requestMemUsage
      }
    },
    title: '',
    legend: false,
    credits: {
      enabled: false
    },
    tooltip: {
      valueSuffix: ' MB',
      headerFormat: '',
      pointFormat: '{point.y}'
    },
    xAxis: {
      categories: [
        'Free',
        'Used',
        'Buffered',
        'Cached'
      ]
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Usage (MB)'
      }
    },
    series: [{
      data: [
        {
          color: '#76a833',
          y: 0
        },
        {
          color: '#ba1744',
          y: 0
        },
        {
          color: '#007dff',
          y: 0
        },
        {
          color: '#ffe100',
          y: 0
        }
      ]
    }]
  });
});
