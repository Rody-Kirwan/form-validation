import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Header from 'components/header/header.js';

import styles from './app.scss';

export default class App extends Component {
  render() {
    return(
      <div className={styles['app-container']}>
        <Header />
        <h1>Appy Days!</h1>
        <Redirect to='/welcome' />
      </div>
    );
  }
}