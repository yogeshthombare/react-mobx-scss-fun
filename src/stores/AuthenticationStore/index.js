import { types, flow, getParent } from 'mobx-state-tree'
import * as cookies from 'browser-cookies'
// import { User } from '../../models/UserModel'

export const AuthenticationStore = types
  .model('AuthenticationStore', {
    user: types.frozen(), // FIXME: types.maybe(User) this needs to be updated once the response shape can be defined as JSON
    loading: types.optional(types.boolean, false),
    error: types.frozen(),
    message: types.frozen(),
    authenticated: types.optional(types.boolean, false),
    privacyStatement: types.optional(types.string, ''),
  })
  .actions(self => ({
    fetchCurrentUser: flow(function * () {
      // let currentToken = fetchToken()
      // self.error = undefined
      // self.message = undefined
      // self.loading = true
      // self.authenticated = !!currentToken.token
    }),
  //     if (!currentToken.token) {
  //       self.user = undefined
  //       self.loading = false
  //       return
  //     }

  //     try {
  //       const res = yield fetch(`${self.utility.baseUrl}/api/current_user?permissions_format=nested`, self.utility.setRequest())
  //       const response = yield res.json()
  //       if (response.error) {
  //         self.utility.handleError(response.error)
  //         self.authenticated = false
  //         return
  //       }

  //       self.user = response.data
  //       self.authenticated = true
  //       self.loading = false

  //       self.fetchPrivacyStatement()
  //       self.utility.fetchReleaseNotes()
  //       self.teamStore.fetchTeams()
  //       self.mapStore.fetchPinTypes()
  //     } catch(error) {
  //       let notification = {
  //         message: error.error,
  //         error: true
  //       }
  //       self.utility.addNotification(notification)
  //       self.error = error
  //       self.loading = false
  //     }
  //   }),

  //   fetchPrivacyStatement: flow(function * () {
  //     self.error = undefined
  //     self.message = undefined
  //     self.loading = true

  //     const team_id = self.user.team.id
  //     const url = `${self.utility.baseUrl}/api/teams/${team_id}/privacy_statements/app?format=html`
  //     try {
  //       const res = yield fetch(url, self.utility.setRequest())
  //       self.privacyStatement = yield res.text()
  //       self.loading = false
  //     } catch(error) {
  //       self.handleError(error)
  //     }
  //   }),

  //   submitLogin: flow(function * (email, password) {
  //     self.error = undefined
  //     self.loading = true
  //     try {
  //       const res = yield fetch(`${self.utility.baseUrl}/api/sign_in`, {
  //         method: 'post',
  //         mode: 'cors',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ user: {email, password}})
  //       })

  //       const response = yield res.json()

  //       if (response.error) {
  //         let notification = {
  //           message: response.error,
  //           error: true
  //         }
  //         self.loading = false
  //         self.utility.addNotification(notification)
  //         self.error = response.error
  //         return
  //       } else {
  //         generateAccessToken(email, response.data.authentication_token)
  //         self.fetchCurrentUser()
  //       }

  //       self.user = response.data
  //       self.authenticated = true
  //       self.loading = false
  //     } catch(error) {
  //       let notification = {
  //         message: error.error,
  //         error: true
  //       }
  //       self.utility.addNotification(notification)
  //       self.error = error
  //       self.loading = false
  //     }
  //   }),

  //   submitLogout: flow(function * () {
  //     let currentToken = fetchToken()
  //     self.error = undefined
  //     self.user = undefined
  //     self.authenticated = false
  //     self.loading = true
  //     try {
  //       yield fetch(`${self.utility.baseUrl}/api/sign_out`, {
  //         method: 'delete',
  //         mode: 'cors',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'X-USER-EMAIL': currentToken.email,
  //           'X-USER-TOKEN': currentToken.token
  //         }
  //       })

  //       cookies.erase('token')
  //       cookies.erase('email')
  //       // self.taskStore.removeGlobalFilter(null, true)
  //       self.mapStore.updateCurrentMap(null, true)
  //       self.app.resetApplication()
  //       self.loading = false
  //     } catch(error) {
  //       self.handleError(error)
  //     }
  //   }),

  //   submitAccountRecovery: flow(function * (email) {
  //     self.error = undefined
  //     self.loading = true
  //     try {
  //       const res = yield fetch(`${self.utility.baseUrl}/api/forgot_password`, {
  //         method: 'post',
  //         mode: 'cors',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           'email': email
  //         })
  //       })

  //       const response = yield res.json()

  //       if (response.error || response.message) {
  //         self.handleError(response.error || response.message)
  //         return
  //       }

  //       self.authenticated = false
  //       self.loading = false
  //     } catch(error) {
  //       self.handleError(error)
  //     }
  //   }),

  //   // FIXME: when everyone decides what they want this to do
  //   submitAccountCreation(params) {
  //     console.log('submitAccountCreation:', params)
  //   },

  //   submitPasswordReset(params) {
  //     console.log('submitPasswordReset:', params)
  //   },
  //   //end FIXME

    handleError(error) {
      console.log(error)
      let notification = { message: error.error, error: true }
      self.utility.addNotification(notification)
      self.error = error
      self.loading = false
    },
  }))
  .views(self => ({
    get userTeams() {
      return self.user.teams.map(item => {
        return item.name
      })
    },

    get utility() {
      return getParent(self).utilityStore
    },

    get mapStore() {
      return getParent(self).mapStore
    },

    get taskStore() {
      return getParent(self).taskStore
    },

    get projectStore() {
      return getParent(self).projectStore
    },

    get teamStore() {
      return getParent(self).teamStore
    },

    get app() {
      return getParent(self)
    }
  }))

const generateAccessToken = (email, token) => {
  cookies.set('token', token)
  cookies.set('email', email)
}

const fetchToken = () => {
  let token = cookies.get('token')
  let email = cookies.get('email')
  return({
    'token': token,
    'email': email
  })
}
