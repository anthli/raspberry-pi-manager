'use strict';

import React, {Component} from 'react';

import request from '../utils/request';

export default class NavBar extends Component {
  constructor() {
    super();

    this.state = {
      hostname: ''
    };
  }

  componentDidMount() {
    request('GET', '/hostname')
      .then(res => {
        this.setState({hostname: res[0].hostname});
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div id="header">
        <div className="title-bar">
          <div
            id="hostname"
            className="title"
          >
            ./{this.state.hostname}
          </div>
        </div>
      </div>
    )
  }
}