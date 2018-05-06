import * as React from 'react';
import {Component} from 'react';

import Card from '../components/Card';
import {HTTPMethod} from '../utils/httpMethod';
import {request} from '../utils/request';

export default class CpuInfo extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      cpuInfo: []
    };
  }

  componentDidMount() {

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