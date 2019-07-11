import React, { Component } from 'react';

import styles from './header.scss';
import LogoImage from 'img/mwgLogoWhite.png';

export default class Header extends Component {
  render() {
    return(
      <div className={styles['header-wrapper']}>
        <img src={LogoImage}/>
      </div>
    );
  }
}