'use strict';

import React, {Component} from 'react';

import Card from './Card.jsx';

import request from '../utils/request';

export default class CpuInfo extends Component {
  constructor() {
    super();

    this.state = {
      cpuInfo: []
    };
  }

  componentDidMount() {
    // Get the CPU information
    let promises = [
      request('GET', '/command/cpu-model'),
      request('GET', '/command/cpu-architecture'),
      request('GET', '/command/cpu-count'),
      request('GET', '/command/cpu-max-clock'),
      request('GET', '/command/cpu-min-clock')
    ];

    Promise.all(promises).then(res => {
      let flatRes = [].concat.apply([], res);

      this.setState({cpuInfo: flatRes});
    });
  }

  render() {
    return (
      <Card
        icon="fa fa-microchip"
        title="CPU Information"
        sections={this.state.cpuInfo}
      />
    );
  }
}