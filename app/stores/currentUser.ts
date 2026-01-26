import { defineStore } from "pinia";
import "pinia-plugin-persistedstate";

type Attributes = Record<string, unknown>;

export const useCurrentUserStore = defineStore("currentUserStore", {
  state: () => {
    return {
      attributes: {} as Attributes,
    };
  },
  persist: true,
  actions: {
    resetStore() {
      this.attributes = {};
    },
  },
});

// Utility function to check if the user is authenticated
export const isAuthenticated = (): boolean => {
  const currentUser = useCurrentUserStore();
  return Object.keys(currentUser.attributes).length > 0;
};

// Utility function to reset the user state
export const resetUserState = (): void => {
  const currentUser = useCurrentUserStore();
  currentUser.resetStore();
};
