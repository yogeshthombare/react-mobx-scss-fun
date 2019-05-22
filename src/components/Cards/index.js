import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {extendObservable} from 'mobx'
import styles from './styles.module.css'

const Cards = inject('app')(observer(class Cards extends Component{

  constructor(props) {
    super(props)
    const {app: {notificationStore}} = this.props
    extendObservable(this, {
      notificationStore: notificationStore,
    })
  }

  render() {
    const { showCards } = this.notificationStore
    const visible = showCards ?
          styles.dashboardShow:
          styles.dashboardHide
    return (
      <div className={`${styles.dashboardContainer } ${visible}`} >
        <div className={styles.dashboardCard}>

        </div>
        <div className={styles.dashboardCard}>
          
        </div>
        <div className={styles.dashboardCard}>
          
        </div>
      </div>
    )
  }
}))

export default Cards