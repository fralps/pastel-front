// Middleware to check if the user is authenticated
export default defineNuxtRouteMiddleware(async () => {
  if (!isAuthenticated()) {
    console.log("User not authenticated, redirecting to sign-in");

    return await navigateTo("/");
  }
});
