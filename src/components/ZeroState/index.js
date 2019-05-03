import React from 'react'
import styles from './styles.module.css'

const ZeroState = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}></div>
      </div>
      <div className={styles.subHeader}></div>
      <div className={styles.dashboard}></div>
    </div>
  )
}

export default ZeroState