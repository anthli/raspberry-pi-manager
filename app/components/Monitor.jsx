'use strict';

import Highcharts from 'highcharts';
import React, {Component} from 'react';

import Card from './Card.jsx';

import request from '../utils/request';

let cpuUsageChart;
let cpuTempChart;
let memUsageChart;

export default class Monitor extends Component {
  requestCpuUsage() {
    const sendRequest = () => {
      request('GET', '/command/cpu-usage').then(res => {
        let series = cpuUsageChart.series[0];
        let shift = series.data.length > 20;
        let date = new Date().getTime();
        series.addPoint([date, res.content * 1], true, shift);
      })
      .catch(err => {
        console.error(err);
      });
    };

    sendRequest();

    setInterval(() => {
      sendRequest();
    }, 1 * 1000);
  }

  requestCpuTemp() {
    const sendRequest = () => {
      request('GET', '/command/cpu-temp').then(res => {
        let series = cpuTempChart.series[0];
        let shift = series.data.length > 20;
        let date = new Date().getTime();
        series.addPoint([date, res.content * 1], true, shift);
      })
      .catch(err => {
        console.error(err);
      });
    };

    sendRequest();

    setInterval(() => {
      sendRequest();
    }, 1 * 1000);
  }

  requestMemUsage() {
    const sendRequest = () => {
      let promises = [
        request('GET', '/command/free-memory'),
        request('GET', '/command/used-memory'),
        request('GET', '/command/buffered-memory'),
        request('GET', '/command/cached-memory')
      ];

      Promise.all(promises).then(res => {
        memUsageChart.series[0].setData([
          {
            y: Math.round(res[0].content / 1000)
          },
          {
            y: Math.round(res[1].content / 1000)
          },
          {
            y: Math.round(res[2].content / 1000)
          },
          {
            y: Math.round(res[3].content / 1000)
          }
        ]);
      })
      .catch(err => {
        console.error(err);
      });
    };

    sendRequest();

    setInterval(() => {
      sendRequest();
    }, 1 * 1000);
  }

  componentDidMount() {
    // Highcharts configuration

    // Don't use UTC time for time axes
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });

    // CPU Usage chart
    cpuUsageChart = new Highcharts.chart('cpu-usage', {
      chart: {
        type: 'spline',
        events: {
          load: this.requestCpuUsage
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
    cpuTempChart = new Highcharts.chart('cpu-temp', {
      chart: {
        type: 'spline',
        events: {
          load: this.requestCpuTemp
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
    memUsageChart = new Highcharts.chart('mem-usage', {
      chart: {
        type: 'column',
        events: {
          load: this.requestMemUsage
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
  }

  render() {
    let sections = [
      {
        id: 'cpu-usage',
        title: 'CPU Usage',
        cpuUsage: ''
      },
      {
        id: 'cpu-temp',
        title: 'CPU Temperature',
        cpuTemp: ''
      },
      {
        id: 'mem-usage',
        title: 'Memory Usage',
        memUsage: ''
      }
    ];

    return (
      <Card
        icon='fa fa-area-chart'
        title='Monitor'
        sections={sections}
      />
    );
  }
}