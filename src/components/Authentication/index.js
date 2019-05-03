import React, { Component, Fragment } from 'react'
import { extendObservable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import Input from '../../common/Input'
import ErrorLabel from '../../common/ErrorLabel'
import SimpleModal from '../../common/SimpleModal'
import { FaCheckSquare, FaRegSquare, FaCircleNotch } from 'react-icons/fa'
import validator from 'validator'
import styles from './styles.module.css'
// import PrivacyStatement from './privacyStatement.js'

const Authentication = inject('app')(observer(class Authentication extends Component {
  constructor(props) {
    super(props)

    const {app: {auth}} = this.props

    extendObservable(this, {
      auth: auth,
      currentScreen: 'login',
      error: undefined,
      showModal: false,
      // modalMessage: <PrivacyStatement/>,
      acceptedTerms: false,
      email: {
        name: '',
        valid: true
      },
      password: {
        name: '',
        valid: true
      },
      coinfirmPassword: {
        name: '',
        valid: true
      },
      first: {
        name: '',
        valid: true
      },
      last: {
        name: '',
        valid: true
      },
      phone: {
        name: '',
        valid: true
      }
    })
  }

  handleFormSubmit = (e, action) => {
    e.preventDefault()

    this.error = undefined

    if (action === 'login' || action === 'recover') {
      if (!this.email.name.length || !validator.isEmail(this.email.name)) this.email.valid = false
      if (!this.password.name.length) this.password.valid = false

      if (!this.email.valid || (action === 'login' && !this.password.valid)) {
        this.error = 'Please enter a valid email and password'
      }
    }

    // account specific checks for demo
    if (action === 'account') {
      if (!this.coinfirmPassword.name.length || this.coinfirmPassword.name !== this.password.name) {
        this.coinfirmPassword.valid = false
      }
      if (!this.email.valid || !this.password.valid || !this.coinfirmPassword.valid) {
        this.error = 'Please enter a valid email and password'
      }
      if (!this.first.name.length) this.first.valid = false
      if (!this.last.name.length) this.last.valid = false
      if (this.phone.name.length && !validator.isMobilePhone(this.phone.name)) this.phone.valid = false
      if (!this.acceptedTerms) {
        this.error = 'You must accept the Terms and Conditions'
      }
    }

    // password recovery specific checks for demo
    if (action === 'password') {
      if (!this.password.name.length) this.password.valid = false
      if (!this.coinfirmPassword.name.length || this.coinfirmPassword.name !== this.password.name) {
        this.coinfirmPassword.valid = false
        this.error = 'Please enter a valid password'
      }
    }

    if (this.error) return

    const actions = {
      'login': () => {
        this.auth.submitLogin(this.email.name, this.password.name)
      },
      'recover': () => {
        this.auth.submitAccountRecovery(this.email.name)
      },
      'password': () => {
        this.auth.submitPasswordReset(this.password.name)
      },
      'account': () => {
        let params = {
          email: this.email.name,
          password: this.password.name,
          first: this.first.name,
          last: this.last.name,
          phone: this.phone.name
        }
        this.auth.submitAccountCreation(params)
      }
    }

    actions[action]()
  }

  onUpdateInput = (name, value) => {
    this[name].name = value
  }

  onValidate = (name, valid) => {
    this[name].valid = valid
  }

  resetInputFields = () => {
    this.error = undefined
    this.email = {
      name: '',
      valid: true
    }
    this.password = {
      name: '',
      valid: true
    }
    this.coinfirmPassword = {
      name: '',
      valid: true
    }
    this.first = {
      name: '',
      valid: true
    }
    this.last = {
      name: '',
      valid: true
    }
    this.phone = {
      name: '',
      valid: true
    }
  }

  toggleCurrentScreen = (screen) => {
    this.resetInputFields()
    this.currentScreen = screen
  }

  onActionSelection = (action) => {
    const {task} = this.props
    this.modalMessage = `Selected ${action} on task ID ${task.id}`
    this.toggleModal()
    console.log('onAction:', action, task.id)
  }

  handleModalActions = (action) => {
    this.toggleModal()
    this.acceptedTerms = action === 'accept'
  }

  toggleModal = () => {
    this.showModal = !this.showModal
  }

  getLoginLayout() {
    return (
      <form className={styles.authenticationFormContainer}>
        {this.error && <ErrorLabel error={this.error}/>}
        <Input
          label={true}
          type='email'
          name='email'
          placeholder='Enter Email'
          value={this.email.name}
          handleUpdateInput={this.onUpdateInput}
          handleValidation={this.onValidate}
          invalid={!this.email.valid}/>
        <Input
          label={true}
          type='password'
          name='password'
          placeholder='Enter Password'
          value={this.password.name}
          handleUpdateInput={this.onUpdateInput}
          handleValidation={this.onValidate}
          invalid={!this.password.valid}/>
        <button type='button' className={`link ${styles.link}`} onClick={() => this.toggleCurrentScreen('recovery')}>Forgot Password</button>
        <button type='submit' className='lighterBackground' onClick={(e) => this.handleFormSubmit(e, 'login')}>
          Login {this.auth.loading && <FaCircleNotch className={styles.authenticationLoadingIcon}/>}
        </button>
        <p>
          Don't have an account?
          <a className='inlineTextLink lighter' href='https://www.curoglobal.com'> Sign Up</a>
          <button type='button' className='inLineLink' onClick={() => this.toggleCurrentScreen('account')}>DEMO</button>
        </p>
        <p>
          <Link className='inlineTextLink lighter' to={'/terms-of-service'}>  Terms of Service</Link>
          <Link className='inlineTextLink lighter' to={'/privacy-policy'}>  Privacy Notice</Link>
          <a className='inlineTextLink lighter' href='https://curosoftware.zendesk.com/hc/en-us/requests/new'>  Help</a>
        </p>
      </form>
    )
  }

  getRecoveryLayout() {
    return (
      <form className={styles.authenticationFormContainer}>
        <header>
          <h2>Forget your password?</h2>
          <p>Please enter your email address,<br/>and we'll get you back on track.</p>
        </header>
        <Input
          label={true}
          type='email'
          name='email'
          placeholder='Enter Email'
          value={this.email.name}
          handleUpdateInput={this.onUpdateInput}
          handleValidation={this.onValidate}
          invalid={!this.email.valid}
          inlineError={!this.email.valid
            ? 'Please enter a valid email'
            : undefined}/>
        <button type='button' className={`link ${styles.link}`} onClick={() => this.toggleCurrentScreen('login')}>Return to Login</button>
        <div className={styles.authenticationRecoveryContainer}>
          <button type='submit' className='lighterBackground' onClick={(e) => this.handleFormSubmit(e, 'recover')}>
            Submit {this.auth.loading && <FaCircleNotch className={styles.authenticationLoadingIcon}/>}
          </button>
          <button className='link' onClick={() => this.toggleCurrentScreen('login')}>Cancel</button>
        </div>
      </form>
    )
  }

  getAccountLayout() {
    return (
      <Fragment>
        <form className={styles.authenticationFormContainer}>
          {this.error && <ErrorLabel error={this.error}/>}
          <Input
            label={true}
            type='email'
            name='email'
            placeholder='Enter Email'
            value={this.email.name}
            handleUpdateInput={this.onUpdateInput}
            handleValidation={this.onValidate}
            invalid={!this.email.valid}
            inlineError={!this.email.valid
              ? 'Please enter a valid email'
              : undefined}/>
          <Input
            label={true}
            type='password'
            name='password'
            placeholder='Enter Password'
            value={this.password.name}
            handleUpdateInput={this.onUpdateInput}
            handleValidation={this.onValidate}
            invalid={!this.password.valid}/>
          <Input
            label={true}
            type='password'
            name='coinfirmPassword'
            placeholder='Confirm Password'
            value={this.coinfirmPassword.name}
            handleUpdateInput={this.onUpdateInput}
            handleValidation={this.onValidate}
            invalid={!this.coinfirmPassword.valid}
            inlineError={!this.coinfirmPassword.valid
              ? 'Passwords must match'
              : undefined}/>
          <Input
            label={true}
            type='text'
            name='first'
            placeholder='First Name'
            value={this.first.name}
            handleUpdateInput={this.onUpdateInput}
            handleValidation={this.onValidate}
            invalid={!this.first.valid}
            inlineError={!this.first.valid
              ? 'Please enter your first name'
              : undefined}/>
          <Input
            label={true}
            type='text'
            name='last'
            placeholder='Last Name'
            value={this.last.name}
            handleUpdateInput={this.onUpdateInput}
            handleValidation={this.onValidate}
            invalid={!this.last.valid}
            inlineError={!this.last.valid
              ? 'Please enter your last name'
              : undefined}/>
          <Input
            label={true}
            type='tel'
            name='phone'
            placeholder='Phone Number'
            value={this.phone.name}
            handleUpdateInput={this.onUpdateInput}
            handleValidation={this.onValidate}
            invalid={!this.phone.valid}
            inlineError={!this.phone.valid
              ? 'Please enter a valid phone number'
              : undefined}/>
          <div className={styles.authenticationTermsContainer}>
            {this.acceptedTerms
              ? <FaCheckSquare className={styles.authenticationTermsCheck} onClick={this.toggleModal}/>
              : <FaRegSquare className={styles.authenticationTermsCheck} onClick={this.toggleModal}/>}
            <p>I agree to the personal data processing terms and conditions.</p>
          </div>
          <button type='submit' className='lighterBackground' onClick={(e) => this.handleFormSubmit(e, 'account')}>Sign Up</button>
          <button type='button' className={`link ${styles.link}`} onClick={() => this.toggleCurrentScreen('login')}>Return to Login</button>
          {this.showModal && <SimpleModal show={this.showModal}
            title='Privacy Statement for use of the Curo Application'
            message={this.modalMessage && this.modalMessage}
            handleActionClick={(action) => this.handleModalActions(action)}
            handleToggleModal={this.toggleModal}
            actions={[
              {name: 'accept'},
              {name: 'decline'}
            ]}/>}
        </form>
        <form className={styles.authenticationFormContainer}>
          {this.error && <ErrorLabel error={this.error}/>}
          <Input
            label={true}
            type='password'
            name='password'
            placeholder='Enter Password'
            value={this.password.name}
            handleUpdateInput={this.onUpdateInput}
            handleValidation={this.onValidate}
            invalid={!this.password.valid}
            inlineError={!this.password.valid
              ? 'Passwords must be between 8 and 72 characters'
              : undefined}/>
          <Input
            label={true}
            type='password'
            name='coinfirmPassword'
            placeholder='Confirm Password'
            value={this.coinfirmPassword.name}
            handleUpdateInput={this.onUpdateInput}
            handleValidation={this.onValidate}
            invalid={!this.coinfirmPassword.valid}
            inlineError={!this.coinfirmPassword.valid
              ? 'Passwords must match'
              : undefined}/>
          <button type='submit' className='lighterBackground' onClick={(e) => this.handleFormSubmit(e, 'password')}>
            Submit {this.auth.loading && <FaCircleNotch className={styles.authenticationLoadingIcon}/>}
          </button>
        </form>
      </Fragment>
    )
  }

  render() {
    const screens = {
      'login': () => {
        return this.getLoginLayout()
      },
      // 'recovery': () => {
      //   return this.getRecoveryLayout()
      // },
      // 'account': () => {
      //   return this.getAccountLayout()
      // }
    }
    const layout = screens[this.currentScreen]()

    return (
      <div className={styles.authenticationContainer}>
        <div className={styles.authenticationLogo}/>
        {layout}
        <div className={styles.authenticationFooter}/>
      </div>
    )
  }
}))

export default Authentication
