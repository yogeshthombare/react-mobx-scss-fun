import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { extendObservable } from 'mobx'
import Cards from '../Cards'
import styles from './styles.module.css'

const Dashboard = inject('app')(observer(class Dashboard extends Component {
  constructor(props) {
    super(props)


    extendObservable(this, {
      // app: app,
      // auth: auth,
      // taskStore: taskStore,
      // mapStore: mapStore,
      // reportStore: reportStore,
      // dashboardStore: dashboardStore
    })
  }

  componentWillMount() {
    // this.app.updateCurrentPage('dashboard')
    // this.mapStore.updateCurrentMap(null, true)
  }

  componentDidMount() {
    // this.dashboardStore.fetchTasks()
    // this.reportStore.fetchCurrentStats()
  }

  getLayout = () => {
    // const {globalMapAvailable, floorplanAvailable} = this.mapStore
    return (
      <div className={styles.dashboardMapZeroState}>No available maps to display!</div>)
  }

  render() {
    // const mapLoading = this.dashboardStore.loading || this.mapStore.loading
    return (
      <section className={styles.dashboardContainer}>
          <Cards/>
        <div className={styles.dashboardTasksContainer}>
          <div className={styles.dashboardStats}>
            <p>I am just checking if it has the right content inside the box</p>
          </div>
          <div className={styles.dashboardStats}>
            <h3>Contents are confirmed within the box</h3>
          </div>
          <div className={styles.dashboardStats}>
            <h2>Tested and working fine.</h2>
          </div>
          <div className={styles.dashboardStats}>
            <h4>This is to check if the scroll y is working fine.</h4>
          </div>
          <div className={styles.dashboardStats}>
            <h1>Yay it's working</h1>
          </div>
        </div>
        <div className={styles.dashboardMapContainer}>
          { this.getLayout() }
        </div>
        {/* <NotificationsFeed/>
        <ActivityFeed/> */}
      </section>
    )
  }
}))

export default Dashboard
