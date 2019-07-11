import React from 'react';
import PropTypes from 'prop-types';

import styles from './form.scss';

const Form = ({ children, ...props }) => {
  return (
    <div className={styles[props.className]}>
      <form {...props}>
        {children}
      </form>
    </div>
  );
};

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Form;
