import React, {Component} from 'react';
import logo from '../../logo.svg';
import '../../global.css';
import { inject, observer } from 'mobx-react'
// import { extendObservable } from 'mobx'
import styles from './styles.module.css'
import ZeroState from '../ZeroState'
import Main from '../Main'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

const Application = inject('app')(observer(class Application extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.applicationContainer}>
        <Router>
          {/* <Route path='/privacy-policy' component={this.getLegalNotesPrivacy}/>
          <Route path='/terms-of-service' component={this.getLegalNotesTerms}/> */}
          {/* {layout} */}
          {/* <ZeroState/> */}
          <Main/>
          <Route exact path='/' render={() => (
            // this.auth.authenticated
              <Redirect to='/dashboard'/>
              // <Redirect to='/' />
          )}/>
        </Router>
      </div>
    )
  }
}))

export default Application;
