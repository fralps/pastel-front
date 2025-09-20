import { defineStore } from 'pinia'

export const useCurrentUserStore = defineStore('currentUserStore', {
  state: () => {
    return {
      attributes: {}
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
})

export const isAuthenticated = () => {
  const currentUser = useCurrentUserStore()
  return Object.keys(currentUser.attributes).length > 0
}