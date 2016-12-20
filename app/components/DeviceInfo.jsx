'use strict';

import React, {Component} from 'react';

import Card from './Card.jsx';

import request from '../utils/request';

export default class DeviceInfo extends Component {
  constructor() {
    super();

    this.state = {
      sysinfo: {},
      uptime: ''
    };
  }

  componentDidMount() {
    // Get the system information
    request('GET', '/sys-info')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });

    // Get the uptime
    request('GET', '/uptime')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });

    // Request the uptime every minute
    setInterval(() => {
      request('GET', '/uptime')
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    }, 60 * 1000);
  }

  render() {
    return (
      <Card
        icon="fa fa-desktop"
        title="Device Information"
        sections=""
      />
    );
  }
}