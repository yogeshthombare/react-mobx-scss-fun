import { types } from 'mobx-state-tree'
export const NotificationStore = types
  .model('NotificationStore', {
    showFeed: types.frozen(true),
    showCards: types.frozen(true),
    currentPage: types.optional(types.string, 'dashboard')
  })
  .actions(self => ({
    toggleDashboardCards() {
      self.showCards = !self.showCards
    },
    toggleActivity() {
      self.showFeed = !self.showFeed
    },
  }))
  .views(self => ({

  }))
