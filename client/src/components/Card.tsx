import * as _ from 'lodash';
import * as React from 'react';
import {Component} from 'react';

export default class Card extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let sections = _.map(this.props.sections, section => {
      return (
        <div
          key={section.id}
          className='card-section'
        >
          <div className='card-section-title'>{section.title}</div>

          <div
            id={section.id}
            className='card-section-content'
          >
            {section.content}
          </div>
        </div>
      );
    });

    return (
      <div className='card'>
        <div className='card-icon'>
          <i className={this.props.icon}></i>
        </div>

        <div className='card-title'>{this.props.title}</div>

        {sections}
      </div>
    );
  }
}