import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'widgets';

import ValidIcon from 'img/check.png';
import styles from './form-input.scss';

const FormInput = ({ validate, validationTypes, label, ...props}) => {
  const [ state, setStatus ] = useState({
    status: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    validate(value, validationTypes)
      .then((newState) => {
        setStatus(newState);
      })
      .then(() => props.onChange({
        name, value, status 
      }));
  };

  // TODO: See why this renders 3 times (should be 2)
  const showIcon = state.status === 'valid';
  const showLabel = !!label;

  return (
    <div className={`${styles[state.status]} ${styles['form-input-container']}`}>
      { showLabel && <label>{label}</label> }
      <Input {...props} onChange={handleChange} />
      <span className={styles.message}>{state.message}</span>
      {
        showIcon && <img src={ValidIcon} className={styles.icon} />
      }
    </div>
  );
};

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  validationTypes: PropTypes.array,
  label: PropTypes.string
};

export default FormInput;
