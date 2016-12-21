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
      request('GET', '/cpu-model'),
      request('GET', '/cpu-architecture'),
      request('GET', '/cpu-count'),
      request('GET', '/cpu-max-clock'),
      request('GET', '/cpu-min-clock')
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