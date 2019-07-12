import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from 'components/header/header.js';

import styles from './app.scss';

const App = () => (
  <div className={styles['app-container']}>
    <Header />
    <h1>Appy Days!</h1>
    <Redirect to='/welcome' />
  </div>
);

export default App;
