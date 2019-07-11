import React, { Component } from 'react';

import { FormInput, Form, Button } from 'widgets';
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

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', this.state);
    // Action to submit state o object
  }

  render() {
    return(
      <div className={styles['subscribe-wrapper']}>
        <Form className="subscription" onSubmit={this.handleSubmit} validate={'validateSubscription'}>
          <FormInput
            onChange={this.handleChange}
            validate={ValidateStr}
            validationTypes={['required', 'email']}
            value={this.state.email}
            name="email"
            type="email"
          />
          <FormInput
            onChange={this.handleChange}
            validate={ValidateStr}
            validationTypes={['required', 'maxLength']}
            value={this.state.firstName}
            name="firstName"
          />
          <Button className="default" type="submit" disabled={this.state.isValid}>
            SUBMIT
          </Button>
        </Form>
      </div>
    );
  }
}