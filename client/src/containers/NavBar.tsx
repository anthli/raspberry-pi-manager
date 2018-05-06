import * as React from 'react';
import {Component} from 'react';

import {HTTPMethod} from '../utils/httpMethod';
import {request} from '../utils/request';

export default class NavBar extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: '',
      hostname: ''
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div id='header'>
        <div className='title-bar'>
          <div
            id={this.state.id}
            className='title'
          >
            ./{this.state.hostname}
          </div>
        </div>
      </div>
    )
  }
}