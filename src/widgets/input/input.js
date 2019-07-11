import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.scss';

const Input = (props = {}) => {
  return (
    <input {...props} onChange={props.onChange} className={styles.default} />
  );
};

Input.propTypes = {
  onChange: PropTypes.func
};

export default Input;
