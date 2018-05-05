'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import DeviceInfo from './containers/DeviceInfo.jsx';
import CpuInfo from './containers/CpuInfo.jsx';
import Monitor from './containers/Monitor.jsx';
import NavBar from './containers/NavBar.jsx';

ReactDOM.render(
  <div>
    <NavBar />

    <div id='content'>
      <DeviceInfo />
      <CpuInfo />
      <Monitor />
    </div>
  </div>,
  document.getElementById('app')
);