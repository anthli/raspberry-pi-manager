import * as React from 'react';
import {Component} from 'react';

import Card from '../components/Card';
import {HTTPMethod} from '../utils/httpMethod';
import {request} from '../utils/request';

export default class Monitor extends Component<any, any> {
  componentDidMount() {

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