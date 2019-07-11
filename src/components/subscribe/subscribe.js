import React, { Component } from 'react';

import { FormInput } from 'widgets';
import { ValidateStr } from 'js/validation';

import styles from './subscribe.scss';

export default class Subscribe extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      firstName: ''
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
          validate={ValidateStr}
          validationTypes={['required', 'email']}
          value={this.state.email}
          name="email"
        />
        <br />
        <FormInput
          onChange={this.handleChange}
          validate={ValidateStr}
          validationTypes={['required', 'maxLength']}
          value={this.state.firstName}
          name="firstName"
        />
      </div>
    );
  }
}