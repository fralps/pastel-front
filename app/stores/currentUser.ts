import { defineStore } from "pinia";

export const useCurrentUserStore = defineStore("currentUserStore", {
  state: () => {
    return {
      attributes: {},
    };
  },
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      httpOnly: false,
      secure: true,
      sameSite: "lax",
    }),
  },
  actions: {
    resetStore() {
      this.attributes = {};
    },
  },
});

// Utility function to check if the user is authenticated
export const isAuthenticated = () => {
  const currentUser = useCurrentUserStore();
  return Object.keys(currentUser.attributes).length > 0;
};

// Utility function to reset the user state
export const resetUserState = () => {
  const currentUser = useCurrentUserStore();
  currentUser.resetStore();
};
