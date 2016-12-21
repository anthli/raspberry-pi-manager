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
    let modelReq = request('GET', '/cpu-model');
    let architectureReq = request('GET', '/cpu-architecture');
    let countReq = request('GET', '/cpu-count');
    let maxClockReq = request('GET', '/cpu-max-clock');
    let minClockReq = request('GET', '/cpu-min-clock');

    let promises = [modelReq, architectureReq, maxClockReq, minClockReq];
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