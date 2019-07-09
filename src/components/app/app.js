import React, { Component } from 'react'

import styles from './app.scss'

export default class App extends Component {
  render() {
    return(
      <div className={styles['app-container']}>
        <h1>Appy Days!</h1>
      </div>
    )
  }
}