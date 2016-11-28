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
      series.addPoint([date, data.cpuLoad * 1], true, shift);
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
      series.addPoint([date, data.cpuTemp * 1], true, shift);
    },
    complete: setTimeout(requestCpuTemp, 1 * 1000)
  });
};

const requestMemUsage = () => {
  $.ajax({
    url: '/memusage',
    dataType: 'json',
    success: (data) => {
      // Set each value out of 100 instead of 1
      memUsageChart.series[0].setData([
        {
          value: Math.round(data.freeMem * 100)
        },
        {
          value: Math.round(data.availableMem * 100)
        },
        {
          value: Math.round(data.bufferedMem * 100)
        },
        {
          value: Math.round(data.cachedMem * 100)
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

  // CPU Load chart
  cpuLoadChart = new Highcharts.Chart({
    chart: {
      renderTo: 'cpuLoad',
      type: 'spline',
      events: {
        load: requestCpuLoad
      }
    },
    title: '',
    legend: false,
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    tooltip: {
      xDateFormat: '%a %b %d %H:%M:%S',
      valuePrefix: '%'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 100,
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
      labels: {
        format: '{value: 1.0f}'
      },
      title: {
        text: 'Load (%)'
      }
    },
    series: [{
      name: 'Load',
      color: '#76a833',
      data: []
    }]
  });

  // CPU temperature chart
  cpuTempChart = new Highcharts.Chart({
    chart: {
      renderTo: 'cpuTemp',
      type: 'spline',
      events: {
        load: requestCpuTemp
      }
    },
    title: '',
    legend: false,
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    tooltip: {
      xDateFormat: '%a %b %d %H:%M:%S',
      valueSuffix: '(\xB0C)'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 100,
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
      labels: {
        format: '{value: 1.0f}'
      },
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
  memUsageChart = new Highcharts.Chart({
    chart: {
      renderTo: 'memUsage',
      type: 'bar',
      events: {
        load: requestMemUsage
      }
    },
    title: '',
    legend: false,
    plotOptions: {
      bar: {
        enableMouseTracking: false
      }
    },
    tooltip: {
      valuePrefix: '%'
    },
    xAxis: {
      categories: [
        'Free',
        'Available',
        'Buffered',
        'Cached'
      ]
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Percentage (%)'
      }
    },
    series: [{
      data: [
        {
          value: 0,
          color: 'red'
        },
        {
          value: 0,
          color: 'green'
        },
        {
          value: 0,
          color: 'blue'
        },
        {
          value: 0,
          color: 'orange'
        }
      ]
    }]
  });
});