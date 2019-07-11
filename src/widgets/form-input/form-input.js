import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'widgets';

import styles from './form-input.scss';

const FormInput = ({ validate, validationTypes, ...props}) => {
  const [ state, setStatus ] = useState({
    status: 'valid',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    validate(value, validationTypes)
      .then((newState) => {
        setStatus(newState);
      })
      .finally(() => props.onChange({
        name, value, status 
      }));
  };

  return (
    <div className={styles[state.status]}>
      <Input {...props} onChange={handleChange} />
      <span>{state.message}</span>
    </div>
  );
};

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  validationTypes: PropTypes.array
};

export default FormInput;
