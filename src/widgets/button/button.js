import React from 'react';
import PropTypes from 'prop-types';

import styles from './button.scss';

const Button = (props = {}) => {
  return (
    <button {...props} className={`${styles[props.className]}`} />
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default Button;
