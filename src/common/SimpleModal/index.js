import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { extendObservable } from 'mobx'
// import OutsideClickHandler from 'react-outside-click-handler'
import styles from './styles.module.css'

const SimpleModal = (observer(class SimpleModal extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {

    })
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress = e => {
    if (e.keyCode === 27) {
      this.props.handleToggleModal()
    }
  }

  onActionClick = (action) => {
    const {handleActionClick} = this.props
    handleActionClick(action)
  }

  render() {
    const {title, message, actions, show, handleToggleModal} = this.props
    const openStyle = show
      ? styles.popupModalShow
      : ''

    return (
      <div className={`${styles.simpleModalContainer} ${openStyle}`}>
        {/* <OutsideCcomponent should wrap your whole application. In most cases it lickHandler onOutsideClick={handleToggleModal}> */}
          <div className={styles.simpleModalContainerInner}>
            <header className={styles.simpleModalHeader}>
              <h3>{title}</h3>
            </header>
            <div className={styles.simpleModalContent}>
              {message}
            </div>
            <div className={styles.simpleModalFooter}>
              {actions && actions.map((item, i) => {
                return (
                  <div className={styles.simpleModalActionItem} key={`${i}-${item.name}`} onClick={() => this.onActionClick(item.name)}>
                    {item.name}
                  </div>
                )
              })}
            </div>
          </div>
        {/* </OutsideClickHandler> */}
      </div>
    )
  }
}))

export default SimpleModal
