import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {extendObservable} from 'mobx'
import styles from './styles.module.css'

const Cards = inject('app')(observer(class Cards extends Component{
  constructor(props) {
    super(props)
    
    extendObservable(this, {

    })
  }

  render() {
    return (
      <div className={styles.dashboardContainer } >
        <div className={`${styles.dashboardCard} ${styles.dashboardShow}`}>

        </div>
        <div className={`${styles.dashboardCard} ${styles.dashboardShow}`}>
          
        </div>
        <div className={`${styles.dashboardCard} ${styles.dashboardShow}`}>
          
        </div>
      </div>
    )
  }
}))

export default Cards