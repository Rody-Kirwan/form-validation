import React from 'react';
import PropTypes from 'prop-types';

const Input = (props = {}) => {
  return (
    <input {...props} onChange={props.onChange} />
  );
};

Input.propTypes = {
  onChange: PropTypes.func
};

export default Input;
