export default defineNuxtPlugin((nuxtApp) => {
  const userAuth = useCookie('token')
  const config = useRuntimeConfig()

  const $customFetch = $fetch.create({
    baseURL: config.baseUrl as string ?? 'http://localhost:3000/api/v1',
    onRequest({ _request, options, _error }) {
      if (userAuth.value) {
        // Add Authorization header
        options.headers.set('Authorization', `Bearer ${userAuth.value}`)
      }
    },
    onResponse({ _response }) {
      // _response._data = new myBusinessResponse(_response._data)
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
