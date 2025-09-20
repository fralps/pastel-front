// middleware/auth.js
import { isAuthenticated } from '@/stores/currentUser'

export default defineNuxtRouteMiddleware(() => {
  // Ne s'exécute que côté client
  if (import.meta.server) return

  console.log('isAuth middleware', isAuthenticated());

  if (!isAuthenticated()) {
    return navigateTo('/auth/sign-in')
  }
})