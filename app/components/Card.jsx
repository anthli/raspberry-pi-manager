'use strict';

import _ from 'lodash';
import React, {Component} from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sections = _.map(this.props.sections, section => {
      // The id of each section is the key that isn't the title
      let id = _.filter(Object.keys(section), key => key !== 'title');

      return (
        <div
          key={section.title}
          className="card-section"
        >
          <div className="card-section-title">{section.title}</div>

          <div
            id={id}
            className="card-section-content"
          >
            {section[id]}
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