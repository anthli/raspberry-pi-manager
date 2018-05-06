import * as React from 'react';
import {Component} from 'react';

import Card from '../components/Card';
import {HTTPMethod} from '../utils/httpMethod';
import {request} from '../utils/request';

export default class DeviceInfo extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      sysInfo: []
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <Card
        icon='fa fa-desktop'
        title='Device Information'
        sections={this.state.sysInfo}
      />
    );
  }
}