import React, { Component } from 'react';

import { FormInput } from 'widgets';
import { emailFormat } from 'js/validation';

import styles from './subscribe.scss';

export default class Subscribe extends Component {
  constructor() {
    super();
    this.state = {
      email: ''
    };
  }

  handleChange = ({ name, value }) => this.setState({
    [name]: value
  })

  render() {
    return(
      <div className={styles['subscribe-wrapper']}>
        <h1>Subscribe</h1>
        <FormInput
          onChange={this.handleChange}
          validate={emailFormat}
          value={this.state.email}
          name="email"
        />
      </div>
    );
  }
}