import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { extendObservable } from 'mobx'
// import AutoCompleteInput from '../../common/AutoCompleteInput'
import { NavLink, Redirect } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import styles from './styles.module.css'
// import LocationMenu from '../../common/LocationMenu'
// import LegalTerms from '../LegalTerms'


const Header = inject('app')(observer(class Header extends Component {
  constructor(props) {
    super(props)

    const {app: {auth, taskStore, teamStore, utilityStore}} = this.props

    extendObservable(this, {
      auth: auth,
      taskStore: taskStore,
      teamStore: teamStore,
      utilityStore: utilityStore,
      search: {
        name: '',
        valid: true
      },
      redirect: false,
      showSliderMenu: false
    })
  }

  handleLogout = () => {
    this.auth.submitLogout()
    this.redirect = '/'
  }

  onUpdateInput = (name, value) => {
    this[name].name = value
  }

  onValidate = (name, valid) => {
    this[name].valid = valid
  }

  sliderSelector = () => {
    const { user: { first_name, last_name } } = this.auth
    const { activeTeam } = this.teamStore
    const userName = `${first_name} ${last_name}`
    const initials = `${first_name.charAt(0)} ${last_name.charAt(0)}`
    return (
      <div className={styles.headerProfile}>
        <div className={styles.headerProfileImage}>
          <h2>{initials}</h2>
        </div>
        <div className={styles.headerProfileInfo}>
          <h5>{userName}</h5>
          <p>{activeTeam.name}</p>
        </div>
      </div>
    );
  }

  handleSelection = item => {
    if (item) {
      if (item.team_user_uuid) {
        this.teamStore.setActiveTeam(item)
        this.teamStore.updateTeam(item)
        this.redirect = '/dashboard'
      }

      if (item.action) {
        if (item.action === 'logout') {
          this.handleLogout()
        } else {
          item.action()
        }
      }
    }
  }

  render() {
    const version = this.auth.user.release ? `Version ${this.auth.user.release.version}` : ''
    const {teams, activeTeam} = this.teamStore

    const headerProfileMenuItems = [
      {
        name: <a href="https://www.curoglobal.com">Account</a>,
      }, {
        name: <a href="https://curosoftware.zendesk.com/hc/en-us/requests/new">Help</a>
      }, {
        name: 'Release Notes',
        action: this.utilityStore.toggleReleaseNotes,
        autoClose: true,
      }, {
        name: 'Privacy Policy',
        action: this.utilityStore.togglePrivacyPolicy,
        autoClose: true,
      }, {
        name: 'Terms of Service',
        action: this.utilityStore.toggleTermsOfService,
        autoClose: true,
      }, {
        name: <NavLink to={'/dashboard'} className={styles.sliderMenuLogout}>Logout</NavLink>,
        action: 'logout'
      }, {
        name: <div className={styles.sliderMenuVersion}>{version}</div>,
      }
    ]

    if (teams && teams.length > 1) {
      const switchCompany = {
        name: 'Switch company',
        items: teams.map(team => ({...team, active: team.name === activeTeam.name}))
      }
      headerProfileMenuItems.splice(1, 0, switchCompany)
    }

    return (
      <header className={styles.headerContainer}>
        <div className={styles.headerNav}>
          <div className={styles.headerLogo} />
          <NavLink to={'/dashboard'} activeClassName={styles.headerActiveTab}>Dashboard</NavLink>
          <NavLink to={'/tasks'} activeClassName={styles.headerActiveTab}>Tasks</NavLink>
        </div>
        <div className={styles.headerInfo}>
          <form className={styles.headerSearchForm}>
            {/* <AutoCompleteInput suggestions={this.taskStore.fullTaskList} icon={<FaSearch/>} placeholder={'Title, checklist, description, id...'}/> */}
          </form>
          <div className={styles.headerProfile}>
            {/* <LocationMenu
              top={100}
              right={true}
              heightAuto={true}
              fullHover={true}
              autoClose={true}
              trigger={this.sliderSelector()}
              items={headerProfileMenuItems}
              callback={this.handleSelection}
              childrenKey={'items'} /> */}
          </div>
        </div>
        {/* <LegalTerms /> */}
        { this.redirect && <Redirect to={this.redirect} /> }
      </header>
    )
  }
}))

export default Header
