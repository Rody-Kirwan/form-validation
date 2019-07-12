import React from 'react';
import PropTypes from 'prop-types';
import styles from './app-alert.scss';

const AppAlert = ({ message, className }) => (
  <div className={styles[className]}>
    <h1>{message}</h1>
  </div>
);

AppAlert.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default AppAlert;