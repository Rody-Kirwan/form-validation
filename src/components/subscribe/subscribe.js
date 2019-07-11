import React, { Component } from 'react';

import { FormInput, FormRow, Form, Button } from 'widgets';
import { ValidateStr } from 'js/validation';

import styles from './subscribe.scss';

export default class Subscribe extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      nationality: '',
      occupation: ''
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
          <FormRow>
            <FormInput
              label="First Name"
              onChange={this.handleChange}
              validate={ValidateStr}
              validationTypes={['required', 'maxLength']}
              value={this.state.firstName}
              name="firstName"
            />
            <FormInput
              label="Last Name"
              onChange={this.handleChange}
              validate={ValidateStr}
              validationTypes={['required', 'maxLength']}
              value={this.state.lastName}
              name="lastName"
            />
          </FormRow>
          <FormRow>
            <FormInput
              placeholder="01/01/1980"
              label="Date of Birth"
              onChange={this.handleChange}
              // validate={ValidateDate}
              format={['dd/mm/yyyy']}
              value={this.state.dateOfBirth}
              name="dateOfBirth"
            />
            <FormInput
              placeholder="Irish"
              label="Nationality"
              onChange={this.handleChange}
              validate={ValidateStr}
              validationTypes={['required', 'maxLength', 'minLength']}
              value={this.state.nationality}
              name="nationality"
            />
          </FormRow>
          <FormRow>
            <FormInput
              placeholder="hello@info.com"
              label="Email"
              onChange={this.handleChange}
              validate={ValidateStr}
              validationTypes={['required', 'email']}
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