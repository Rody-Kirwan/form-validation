import React from 'react';

import styles from './header.scss';
import LogoImage from 'img/mwgLogoWhite.png';

const Header = () => (
  <div className={styles['header-wrapper']}>
    <img src={LogoImage}/>
  </div>
);

export default Header;
