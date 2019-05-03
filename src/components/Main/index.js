import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { extendObservable } from 'mobx'
import { Route } from 'react-router-dom'
// import Header from '../Header'
// import SubHeader from '../SubHeader'
import Dashboard from '../Dashboard'
// import TaskBoard from '../TaskBoard'
// import TaskCreationPanel from '../TaskCreationPanel'
// import UserManagement from '../UserManagement'
// import Assets from '../CompanySettings/Assets'
// import Cheklists from '../CompanySettings/Checklists'
// import LocationType from '../CompanySettings/LocationType'
// import Milestones from '../CompanySettings/Milestones'
// import CompanySettings from '../CompanySettings/Settings'
// import TaskType from '../CompanySettings/TaskType'
// import Businesses from '../Relationships/Businesses'
// import People from '../Relationships/People'
// import ServiceAddresses from '../Relationships/ServiceAddresses'
// import ManageFloorPlan from '../ManageFloorPlan'
import styles from './styles.module.css'

const Main = inject('app')(observer(class Main extends Component {
  constructor(props) {
    super(props)

    const {app: {auth}} = this.props

    extendObservable(this, {
      auth: auth,
    })
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        {/* <Header/>
        <SubHeader/> */}
        <Route exact path='/dashboard' component={Dashboard}/>
        {/* <Route exact path='/dashboard/create-task' component={TaskCreationPanel}/>
        <Route exact path='/tasks' component={TaskBoard}/>
        <Route exact path='/tasks/create-task' component={TaskCreationPanel}/>
        <Route exact path='/floorplan/edit' component={ManageFloorPlan}/>
        <Route path='/user-management' component={UserManagement}/>
        <Route path='/company-settings/assets' component={Assets}/>
        <Route path='/company-settings/checklists' component={Cheklists}/>
        <Route path='/company-settings/location-type' component={LocationType}/>
        <Route path='/company-settings/milestones' component={Milestones}/>
        <Route path='/company-settings/settings' component={CompanySettings}/>
        <Route path='/company-settings/task-type' component={TaskType}/>
        <Route path='/relationships/businesses' component={Businesses}/>
        <Route path='/relationships/people' component={People}/>
        <Route path='/relationships/service-addresses' component={ServiceAddresses}/> */}
      </div>
    )
  }
}))

export default Main
