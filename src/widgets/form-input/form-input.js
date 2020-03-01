import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sanitiseProps from 'lodash/omit';

import { Input } from 'widgets';

import ValidIcon from 'img/check.png';
import styles from './form-input.scss';

class FormInput extends Component {
  state = {
    status: '',
    message: ''
  }

  setStatus = (status) => this.setState(status)

  // validate = async (value) => {
  //   const { validation: { validate }} = this.props;
  //   const inputStatus = await validate({ ...this.props, value });
  //   this.setStatus(inputStatus)
  // }

  handleChange = (e) => {
    const { name, value } = e.target;
    const shouldValidate = !!this.props.validation;
    
    if (!shouldValidate) {
      return this.props.onChange({
        name, value, status 
      });
    }

    return this.props.validation.validate({ ...this.props, value })
      .then(this.setStatus)
      .then(this.props.validateGroup)
      .then(() => this.props.onChange({
        name, value, status 
      }));
  }

  render() {
    const { validation = {}, label, ...props } = this.props;
    const { validationTypes } = validation;
    const inputProps = sanitiseProps(props, validationTypes);
    const showIcon = this.state.status === 'valid';
    const showLabel = !!label;

    return (
      <div className={`${styles[this.state.status]} ${styles['form-input-container']}`}>
        { 
          showLabel && <label>{label}</label> 
        }
        <Input {...inputProps} onChange={this.handleChange} />
        <span className={styles.message}>{this.state.message}</span>
        {
          showIcon && <img src={ValidIcon} className={styles.icon} />
        }
      </div>
    );
  }
}

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  validateGroup: PropTypes.func,
  validation: PropTypes.object,
  label: PropTypes.string,
};

export default FormInput;
