import React, {Component, Fragment} from 'react'
import { inject, observer } from 'mobx-react'
import { extendObservable } from 'mobx'
import { MdNotifications, MdMessage, MdAssessment } from 'react-icons/md'
// import { TiFilter } from 'react-icons/ti'
// import PushMenu from '../../common/PushMenu'
// import SettingsMenu from '../../common/SettingsMenu';
// import LocationMenu from '../../common/LocationMenu'
import styles from './styles.module.css'


const SubHeader = inject('app')(observer(class SubHeader extends Component {
  constructor(props) {
    super(props)
    // const {app: {taskStore, filterStore, notificationStore, projectStore, activityFeedStore, reportStore}} = this.props

    extendObservable(this, {
      // taskStore: taskStore,
      // filterStore: filterStore,
      // notificationStore: notificationStore,
      // projectStore: projectStore,
      // activityFeedStore: activityFeedStore,
      // currentUser: props.app.auth.user,
      // userTeamSettings: props.app.auth.user.team.settings,
      // reportStore: reportStore,
      // dueDate: ' '
    })
  }

  componentDidMount() {
    // this.filterStore.initialize(this.currentUser.team_user_id, this.userTeamSettings)
    // this.notificationStore.fetchProjectNotifications()
  }

  handleFilterClean = (item, removeAll) => {
    // this.taskStore.removeGlobalFilter(item, removeAll)
    // if (removeAll) {
    //   this.filterStore.initialize(this.currentUser.team_user_id, this.userTeamSettings)
    // }
  }

  toggleNotificationFeed = () => {
    // this.notificationStore.toggleNotificationFeed()
  }

  toggleActivityFeed = () => {
    // this.activityFeedStore.toggleActivityFeed()
  }

  toggleStatsCards = () => {
    // this.reportStore.toggleStatsCards()
  }

  handleSelection = (selection) => {
    if (!selection) return
    if (this[selection.name]) {
      if (selection.options.value) {
        return this.taskStore.setGlobalFilter(selection, true)
      }
      return this.handleFilterClean(selection)
    }
    this.taskStore.setGlobalFilter(selection, false)
  }

  handleOptionSelection = selection => {
  }

  locationSelector = () => {
    return (
      <button className={styles.subHeaderLocationSelector}>
        <span>{this.projectStore.activeProject.name}</span>
      </button>
    )
  }

  selectLocationItem = item => {
    if (item) {
      if (item.current_role) {
        this.projectStore.setActiveProject(item.id, true)
      } else {
        if (item.id && this.projectStore.activeFloorPlan.id !== item.id) {
          this.projectStore.setActiveFloorplan(item.id)
        }
      }
    }
  }

  render() {
    // const { currentlyActivePage } = this.props.app 
    // const isTaskPage = currentlyActivePage === 'taskboard'
    // const isUserManagementPage = currentlyActivePage === 'usermanagement'
    // const notificationsVisible = this.notificationStore.showFeed
    // const activityFeedVisible = this.activityFeedStore.showFeed 
    // const statsCardsVisible = this.reportStore.showStats
    // const filterCount = this.taskStore.currentFilteredTasks
    //   ? this.taskStore.currentFilteredTasks.length
    //   : 0

    // const appliedFilters =
    //   this.taskStore.selectedGlobalFilters && this.taskStore.selectedGlobalFilters.length > 0
    //     ? this.taskStore.selectedGlobalFilters.length
    //     : false
    // const isLoading = this.projectStore.loading || this.taskStore.loading

    return (
      <div className={styles.subheader}>
        <div className={styles.subheaderLeft}>
          {/* {!isUserManagementPage &&
          <PushMenu
            key='filterMenu'
            loading={this.filterStore.loading}
            filterCount={filterCount}
            appliedFilters={appliedFilters}
            actionItem={<TiFilter className={appliedFilters ? styles.subHeaderLeftIcons : styles.subHeaderLeftOutlineIcons}/>}
            menuItems={this.filterStore.filterMenuItems}
            onSelection={this.handleSelection}
            onClearFilter={this.handleFilterClean}
            onOptionSelected={this.handleOptionSelection}/>
          } */}

          {/* { isTaskPage &&
            <LocationMenu
              top={160}
              trigger={this.locationSelector()}
              items={this.projectStore.projectsList}
              loading={isLoading}
              callback={this.selectLocationItem}
              children={this.projectStore.activeProject.floorplans}
              childrenKey={'floorplans'} />
          } */}

        </div>
        <div className={styles.subheaderRight}>
          {/* {!isUserManagementPage &&
            <Fragment>
              { !isTaskPage && <MdAssessment className={statsCardsVisible ? styles.subHeaderRightIcons : styles.subHeaderRightOutlineIcons} onClick={this.toggleStatsCards}/> }
              <div className={styles.subHeaderRightIcons}>
                <MdNotifications className={notificationsVisible ? styles.subHeaderRightIcons: styles.subHeaderRightOutlineIcons} onClick={this.toggleNotificationFeed}/>
                  {
                    this.notificationStore.projectsNotifications
                    && this.notificationStore.projectsNotifications.length > 0
                    && <span className={styles.notificationBadge} />
                  }
              </div>
              <MdMessage className={activityFeedVisible ? styles.subHeaderRightIcons : styles.subHeaderRightOutlineIcons} onClick={this.toggleActivityFeed}/>
            </Fragment> }
          }
          { <SettingsMenu isTaskPage={isTaskPage}/> */}
        </div>
      </div>
    )
  }
}))

export default SubHeader
