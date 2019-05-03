import React, {Component} from 'react';
import logo from '../../logo.svg';
import '../../global.css';
import { inject, observer } from 'mobx-react'
// import { extendObservable } from 'mobx'
import styles from './styles.module.css'
import ZeroState from '../ZeroState'


const Application = inject('app')(observer(class Application extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.applicationContainer}>
        <ZeroState/>
        <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
         <p>
           Edit <code>src/App.js</code> and save to reload.
         </p>
         <p>I am just checking whether it makes any change or not</p>
         <a
           className="App-link"
           href="https://reactjs.org"
           target="_blank"
           rel="noopener noreferrer"
         >
           Learn React
         </a>
       </header>
      </div>
    )
  }
}))

export default Application;
