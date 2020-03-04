import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from 'components/header/header.js';

import styles from './app.scss';

const App = () => (
  <div className={styles['app-container']}>
    <Header />
    <Redirect to='/subscribe' />
  </div>
);

export default App;
