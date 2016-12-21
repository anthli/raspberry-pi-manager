'use strict';

import React, {Component} from 'react';

import DeviceInfo from './DeviceInfo.jsx';
import CpuInfo from './CpuInfo.jsx';
import Monitor from './Monitor.jsx';
import NavBar from './NavBar.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />

        <div id="content">
          <DeviceInfo />
          <CpuInfo />
          <Monitor />
        </div>
      </div>
    );
  }
}