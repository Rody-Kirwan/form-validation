import React from 'react';
import PropTypes from 'prop-types';

import styles from './form.scss';

const FormRow = ({ children }) => (
  <div className={styles['form-row']}>
    {children}
  </div>
);

FormRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default FormRow;