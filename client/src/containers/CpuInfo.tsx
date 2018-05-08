import * as React from 'react';
import {Component} from 'react';

import Card from '../components/Card';
import {Commands} from '../utils/commands';
import {HTTPMethod} from '../utils/httpMethod';
import {request} from '../utils/request';
import {Routes} from '../utils/routes';

export default class CpuInfo extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      cpuInfo: []
    };
  }

  componentDidMount() {
    request(HTTPMethod.GET, Routes.GROUP + Commands.CPU)
      .then(res => {
        console.log('res:', res);
      })
      .catch(err => {
        console.log('err:', err);
      });
  }

  render() {
    return (
      <Card
        icon='fa fa-microchip'
        title='CPU Information'
        sections={this.state.cpuInfo}
      />
    );
  }
}