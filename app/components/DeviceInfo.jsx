'use strict';

import React, {Component} from 'react';

import Card from './Card.jsx';

import request from '../utils/request';

export default class DeviceInfo extends Component {
  constructor() {
    super();

    this.state = {
      sysInfo: []
    };
  }

  componentDidMount() {
    let uptimeReq = request('GET', '/command/uptime');

    // Get the system information
    let promises = [
      request('GET', '/command/operating-system'),
      request('GET', '/command/total-memory'),
      request('GET', '/command/public-ip'),
      uptimeReq
    ];

    Promise.all(promises).then(res => {
      let flatRes = [].concat.apply([], res);
      this.setState({sysInfo: flatRes});
    });

    // Request the uptime every minute. Update the state with the system
    // information containing the new uptime
    setInterval(() => {
      uptimeReq.then(res => {
        let newSysInfo = this.state.sysInfo.slice();
        newSysInfo[3].uptime = res[0].uptime;

        this.setState({sysInfo: newSysInfo});
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
        sections={this.state.sysInfo}
      />
    );
  }
}