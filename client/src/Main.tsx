import * as React from 'react';
import * as ReactDOM from 'react-dom';

import DeviceInfo from './containers/DeviceInfo';
import CpuInfo from './containers/CpuInfo';
import Monitor from './containers/Monitor';
import NavBar from './containers/NavBar';

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