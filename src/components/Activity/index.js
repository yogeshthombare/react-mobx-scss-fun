import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import { FaEmptySet } from 'react-icons/fa'
import styles from './styles.module.css'

const Activity = inject('app')(observer(class Activity extends Component {
  constructor(props) {
    super(props)

    const {app: {notificationStore}} = this.props
    extendObservable(this, {
      notificationStore: notificationStore,
    })
  }

  render(){
    const { showFeed } = this.notificationStore
    const visible = showFeed
      ? styles.showActivityFeed
      : styles.hideActivityFeed
    return (
      <div className={`${styles.dashboardActivityFeed} ${visible}`}></div>
    )
  }

}))

export default Activity;