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
    // Get the system information
    let promises = [
      request('GET', '/operating-system'),
      request('GET', '/total-memory'),
      request('GET', '/public-ip'),
      request('GET', '/uptime')
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