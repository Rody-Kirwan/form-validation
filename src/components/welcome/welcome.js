import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './welcome.scss';

export default class Welcome extends Component {
  render() {
    return(
      <div className={styles['welcome-wrapper']}>
        <h1>Welcome</h1>
        <Link to="/subscribe">
          <div>NEXT</div>
        </Link>
      </div>
    );
  }
}