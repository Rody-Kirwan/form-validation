import React, { useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import { Input } from 'widgets';

import ValidIcon from 'img/check.png';
import styles from './form-input.scss';

const FormInput = ({
  validation: { validate, validationTypes } = {},
  label,
  ...props
}) => {
  const [ state, setStatus ] = useState({
    status: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (!validate) return props.onChange({
      name, value, status 
    });

    return validate(Object.assign(props, { value }))
      .then((newState) => {
        setStatus(newState);
      })
      .then(() => props.onChange({
        name, value, status 
      }));
  };

  const inputProps = omit(props, validationTypes);

  // TODO: See why this renders 3 times (should be 2)
  const showIcon = state.status === 'valid';
  const showLabel = !!label;

  return (
    <div className={`${styles[state.status]} ${styles['form-input-container']}`}>
      { showLabel && <label>{label}</label> }
      <Input {...inputProps} onChange={handleChange} />
      <span className={styles.message}>{state.message}</span>
      {
        showIcon && <img src={ValidIcon} className={styles.icon} />
      }
    </div>
  );
};

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  validation: PropTypes.object,
  label: PropTypes.string
};

export default FormInput;
