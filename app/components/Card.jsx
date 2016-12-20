'use strict';

import React, {Component} from 'react';
import _ from 'lodash';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sections = _.map(this.props.sections, section => {
      return (
        <div className="card-section">
          <div className="card-section-title">{section.title}</div>

          <div
            id={section.id}
            className="card-section-content"
          >
          </div>
        </div>
      );
    });

    return (
      <div className="card">
        <div className="card-icon">
          <i className={this.props.icon}></i>
        </div>

        <div className="card-title">{this.props.title}</div>

        {sections}
      </div>
    );
  }
}