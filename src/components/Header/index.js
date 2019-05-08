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

    // const {app: {auth, taskStore, teamStore, utilityStore}} = this.props

    extendObservable(this, {
      // auth: auth,
      // taskStore: taskStore,
      // teamStore: teamStore,
      // utilityStore: utilityStore,
      // search: {
      //   name: '',
      //   valid: true
      // },
      // redirect: false,
      // showSliderMenu: false
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
    return (
      <header className={styles.headerContainer}>
        <div className={styles.headerNav}>
          <div className={styles.headerLogo} />
          {/* <NavLink to={'/dashboard'} activeClassName={styles.headerActiveTab}>Dashboard</NavLink>
          <NavLink to={'/tasks'} activeClassName={styles.headerActiveTab}>Tasks</NavLink> */}
        </div>
        <div className={styles.headerInfo}>
          <form className={styles.headerSearchForm}>
          </form>
          <div className={styles.headerProfile}>
          </div>
        </div>
      </header>
    )
  }
}))

export default Header
