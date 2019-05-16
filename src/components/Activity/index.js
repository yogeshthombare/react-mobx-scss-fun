import React, { Component } from 'react'
import { FaEmptySet } from 'react-icons/fa'
import styles from './styles.module.css'
import { inject, observer } from 'mobx-react';
import { extendObservable } from 'mobx';

const Activity = inject('app')(observer(class Activity extends Component {
  constructor(props) {
    super(props)

    extendObservable(this, {

    })
  }

  render(){
    return (
      <div>This is test</div>
    )
  }

}))

export default Activity;