import { types, getSnapshot, applySnapshot } from 'mobx-state-tree'
import { AuthenticationStore } from '../AuthenticationStore'


let initialState = {}

export const ApplicationStore = types
  .model('ApplicationStore', {
    auth: types.optional(AuthenticationStore, {
      user: undefined,
      loading: false
    }),
    // taskStore: types.optional(TaskStore, {
    //   tasks: [],
    //   filteredTasks: []
    // }),
    // projectStore: types.optional(ProjectStore, {
    //   projects: []
    // }),
    // utilityStore: types.optional(UtilityStore, {
    //   notifications: []
    // }),
    // mapStore: types.optional(MapStore, {
    //   activeMap: undefined
    // }),
    // filterStore: types.optional(FilterStore, {
    //   pins: [],
    //   teamUsers: [],
    //   teamPriorities: [],
    //   filterMenuItems: [],
    //   dueDate: undefined
    // }),
    // notificationStore: types.optional(NotificationStore, {
    //   notificationsFeed: [],
    //   showFeed: false,
    //   allNotifications: false,
    // }),
    // activityFeedStore: types.optional(ActivityFeedStore, {
    //   showFeed: true,
    // }),
    // teamStore: types.optional(TeamStore, {
    //   teams: [],
    //   activeTeam: {}
    // }),
    // reportStore: types.optional(ReportStore, {
    //     dashboardCards: [],
    //     showStats: true,
    // }),
    // dashboardStore: types.optional(DashboardStore, {
    //     tasks: [],
    //     filteredTasks: [],
    // }),
    // taskboardStore: types.optional(TaskboardStore, {
    //   tasks: [],
    //   filteredTasks: []
    // }),
    currentPage: types.optional(types.string, 'dashboard')
  })
  .actions(self => ({

    afterCreate() {
      initialState = getSnapshot(self)
    },

    resetApplication() {
      applySnapshot(self, initialState)
      self.updateCurrentPage('dashboard')
    },

    updateCurrentPage(page) {
      self.currentPage = page
    }
  }))
  .views(self => ({
    get currentlyActivePage() {
      return self.currentPage
    }
  }))
