import React, { Component } from 'react';

import { FormInput, FormRow, Form, Button } from 'widgets';
import AppAlert from 'components/app-alert/app-alert';
import setValidation from 'js/validation';
import customValidation from 'js/my-validation';

import styles from './subscribe.scss';

const ValidateStr = setValidation(customValidation);

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
        <Form 
          className="subscription" 
          onSubmit={this.handleSubmit}
        >
          <FormRow>
            <FormInput
              id="firstname"
              required
              maxLength={10}
              label="First Name"
              onChange={this.handleChange}
              validation={ValidateStr}
              value={this.state.firstName}
              name="firstName"
            />
            <FormInput
              id="lastname"
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
              id="dob"
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
              id="nationality"
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
              id="email"
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
              id="occupation"
              placeholder="Frontend Developer"
              label="Occupation"
              onChange={this.handleChange}
              value={this.state.occupation}
              name="occupation"
            />
          </FormRow>
          <Button 
            className="default" 
            type="submit" 
            disabled={this.state.isValid}
          >
            SUBMIT
          </Button>
        </Form>
      </div>
    );
  }
}
