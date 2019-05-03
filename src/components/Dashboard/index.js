import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { extendObservable } from 'mobx'
// import TaskContainer from '../TaskContainer'
import LoadingContainer from '../../common/LoadingContainer'
// import MapPanel from '../MapPanel'
// import NotificationsFeed from '../NotificationsFeed'
// import ActivityFeed from '../ActivityFeed'
// import StatsCards from '../StatsCards'
// import { FaEmptySet }LocationMenuLocationMenu from 'react-icons/fa'
// import { FaEmptySet } from 'react-icons/fa';

import styles from './styles.module.css'

const Dashboard = inject('app')(observer(class Dashboard extends Component {
  constructor(props) {
    super(props)

    const {app: {auth, taskStore, mapStore, reportStore, dashboardStore}} = this.props
    const {app} = this.props

    extendObservable(this, {
      app: app,
      auth: auth,
      taskStore: taskStore,
      mapStore: mapStore,
      reportStore: reportStore,
      dashboardStore: dashboardStore
    })
  }

  componentWillMount() {
    this.app.updateCurrentPage('dashboard')
    this.mapStore.updateCurrentMap(null, true)
  }

  componentDidMount() {
    this.dashboardStore.fetchTasks()
    this.reportStore.fetchCurrentStats()
  }

  getLayout = () => {
    const {globalMapAvailable, floorplanAvailable} = this.mapStore

    return (floorplanAvailable || globalMapAvailable) && !!this.dashboardStore.currentlyActiveTask
      ? 'test'
      : <div className={styles.dashboardMapZeroState}>No available maps to display!</div>
  }

  render() {
    const mapLoading = this.dashboardStore.loading || this.mapStore.loading
    return (
      <section className={styles.dashboardContainer}>
        {/* <StatsCards/> */}
        <div className={styles.dashboardTasksContainer}>
          {/* <TaskContainer currentlyActiveList={'dashboard'}/> */}
        </div>
        <div className={styles.dashboardMapContainer}>
          {mapLoading ? <LoadingContainer/> : this.getLayout()}
        </div>
        {/* <NotificationsFeed/>
        <ActivityFeed/> */}
      </section>
    )
  }
}))

export default Dashboard
