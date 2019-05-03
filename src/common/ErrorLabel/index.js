import React from 'react'
import { MdError } from 'react-icons/md'
import styles from './styles.module.css'

const ErrorLabel = (props) => {
  const {error, inline} = props
  const errorLabelStyle = inline
    ? styles.errorLabelContainerInline
    : styles.errorLabelContainer
  return (
    <div className={errorLabelStyle}>
      <p className={styles.errorLabelText}><MdError/>{error}</p>
    </div>
  )
}

export default ErrorLabel
