'use strict';

import React, {Component} from 'react';

import Card from './Card.jsx';

import request from '../utils/request';

export default class Monitor extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    return (
      <Card
        icon="fa fa-area-chart"
        title="Monitor"
        sections={this.state.sysInfo}
      />
    );
  }
}