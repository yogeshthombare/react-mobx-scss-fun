import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { extendObservable } from 'mobx'
import validator from 'validator'
import styles from './styles.module.css'
import { MdRemoveRedEye } from 'react-icons/md'
import ErrorLabel from '../../common/ErrorLabel'

const Input = (observer(class Input extends Component {
  constructor(props) {
    super(props)

    extendObservable(this, {
      isValidated: true,
      showPassword: false
    })
  }

  updateInput = (e) => {
    if (!e.target) return
    const {handleUpdateInput} = this.props

    handleUpdateInput(e.target.name, e.target.value)
  }

  validate = (e) => {
    const {type, value, handleValidation} = this.props

    if (!e.target) return

    const validate = {
      'input': () => {
        return value.length >= 2
      },
      'email': () => {
        return value.length >= 2 && validator.isEmail(value)
      },
      'password': () => {
        return value.length >= 8 && value.length <= 72
      },
      'text': () => {
        return value.length >= 2
      },
      'tel': () => {
        return true
      }
    }

    this.isValidated = validate[type]()

    if (handleValidation) handleValidation(e.target.name, this.isValidated)
  }

  togglePasswordVisibility = () => {
    this.showPassword = !this.showPassword
  }

  render() {
    const {
      label,
      name,
      type,
      placeholder,
      value,
      required,
      invalid,
      inlineError,
      icon,
    } = this.props

    let invalidStyle = invalid ? 'invalid' : ''
    let passwordStyle = this.showPassword ? styles.show : ''

    return (
      <label>
        {label && <p>{placeholder}</p>}
        {icon}
        <input
          className={invalidStyle}
          type={this.showPassword ? 'input' : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={this.updateInput}
          onBlur={this.validate}
          required={required}
          autoComplete='new-password'/>
        {type === 'password' &&
          <div className={`${passwordStyle} ${styles.inputPasswordVisibility}`} onClick={this.togglePasswordVisibility}>
            <MdRemoveRedEye/>
          </div>}
        {this.props.children &&
          <div className={styles.inputIcon}>
            {this.props.children}
          </div>}
        {inlineError && <ErrorLabel error={inlineError} inline={true}/>}
      </label>
    )
  }
}))

export default Input
