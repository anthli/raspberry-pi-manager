'use strict';

import _ from 'lodash';
import React, {Component} from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sections = _.map(this.props.sections, section => {
      console.log(section);

      return (
        <div
          key={section.id}
          className="card-section"
        >
          <div className="card-section-title">{section.title}</div>

          <div
            id={section.id}
            className="card-section-content"
          >
            {section.content}
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