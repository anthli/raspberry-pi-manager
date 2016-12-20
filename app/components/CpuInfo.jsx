'use strict';

import React, {Component} from 'react';

import Card from './Card.jsx';

import request from '../utils/request';

export default class CpuInfo extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  componentDidMount() {
    // Get the CPU information
    request('GET', '/cpu-info')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <Card
        icon="fa fa-microchip"
        title="CPU Information"
        sections=""
      />
    );
  }
}