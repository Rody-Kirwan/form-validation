import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'widgets';

import styles from './form-input.scss';

const FormInput = (props) => {
  const [ status, setStatus ] = useState('valid');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatus(props.validate(value) ? 'valid' : 'invalid');
    props.onChange({ name, value });
  };

  return (
    <div className={styles[status]}>
      <Input {...props} onChange={handleChange} />
    </div>
  );
};

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired
};

export default FormInput;
