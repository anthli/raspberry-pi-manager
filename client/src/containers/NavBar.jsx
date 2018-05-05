'use strict';

import React, {Component} from 'react';

import request from '../utils/request';

export default class NavBar extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      hostname: ''
    };
  }

  componentDidMount() {
    request('GET', '/command/hostname')
      .then(res => {
        this.setState({
          id: res.id,
          hostname: res.content
        });
      })
      .catch(err => {
        console.error(err);
      });
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