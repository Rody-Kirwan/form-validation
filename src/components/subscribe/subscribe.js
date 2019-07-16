import React, { Component } from 'react';

import { FormInput, FormRow, Form, Button } from 'widgets';
import AppAlert from 'components/app-alert/app-alert';
import ValidateStr from 'js/validation';

import styles from './subscribe.scss';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: '',
  nationality: '',
  occupation: '',
  isSubscribed: false,
};

export default class Subscribe extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  handleChange = ({ name, value }) => this.setState({
    [name]: value
  })

  handleSubmit = (e) => {
    e.preventDefault();
    // Action to POST user
    return Promise.resolve().then(() => {
      this.setState({
        ...initialState,
        isSubscribed: true
      });
    });
  }

  render() {
    if (this.state.isSubscribed) {
      return (
        <div className={styles['subscribe-wrapper']}>
          <AppAlert message="Thank You" className="default" />
        </div>
      );
    }

    return (
      <div className={styles['subscribe-wrapper']}>
        <Form className="subscription" onSubmit={this.handleSubmit} validate={'validateSubscription'}>
          <FormRow>
            <FormInput
              required
              maxLength={10}
              label="First Name"
              onChange={this.handleChange}
              validation={ValidateStr}
              value={this.state.firstName}
              name="firstName"
            />
            <FormInput
              required
              maxLength={10}
              label="Last Name"
              onChange={this.handleChange}
              validation={ValidateStr}
              value={this.state.lastName}
              name="lastName"
            />
          </FormRow>
          <FormRow>
            <FormInput
              required
              date="dd/mm/yyyy"
              placeholder="01/01/1980"
              label="Date of Birth"
              onChange={this.handleChange}
              validation={ValidateStr}
              value={this.state.dateOfBirth}
              name="dateOfBirth"
            />
            <FormInput
              required
              maxLength={5}
              placeholder="Irish"
              label="Nationality"
              onChange={this.handleChange}
              validation={ValidateStr}
              value={this.state.nationality}
              name="nationality"
            />
          </FormRow>
          <FormRow>
            <FormInput
              required
              email
              placeholder="hello@info.com"
              label="Email"
              onChange={this.handleChange}
              validation={ValidateStr}
              value={this.state.email}
              name="email"
              type="email"
            />
            <FormInput
              placeholder="Frontend Developer"
              label="Occupation"
              onChange={this.handleChange}
              value={this.state.occupation}
              name="occupation"
            />
          </FormRow>
          <Button className="default" type="submit" disabled={this.state.isValid}>
            SUBMIT
          </Button>
        </Form>
      </div>
    );
  }
}
