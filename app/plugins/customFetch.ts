export default defineNuxtPlugin((nuxtApp) => {
  const userAuth = useCookie('token')
  const config = useRuntimeConfig()

  const $customFetch = $fetch.create({
    baseURL: config.baseUrl as string ?? 'http://localhost:3000/api/v1',
    onRequest({ request, options, error }) {
      if (userAuth.value) {
        // Add Authorization header
        options.headers.set('Authorization', `Bearer ${userAuth.value}`)
      }
    },
    onResponse({ response }) {
      // response._data = new myBusinessResponse(response._data)
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    },
  })
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      customFetch: $customFetch,
    },
  }
})
