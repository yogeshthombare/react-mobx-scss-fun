import React from 'react'
import { FaCircleNotch } from 'react-icons/fa'
import styles from './styles.module.css'

const LoadingContainer = (props) => {
  const bgStyle = props.transparent
    ? styles.loadingContainerTransparent
    : ''
  return (
    <div className={`${styles.loadingContainer} ${bgStyle}`}>
      <FaCircleNotch/>
    </div>
  )
}

export default LoadingContainer
