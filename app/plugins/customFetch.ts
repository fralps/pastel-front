export default defineNuxtPlugin((nuxtApp) => {
  const userAuth = useCookie("token");
  const baseURL: string = import.meta.env.VITE_APP_API_BASE_URL as string;

  const $customFetch = $fetch.create({
    baseURL: baseURL,
    onRequest({ request: _request, options, error: _error }) {
      if (userAuth.value) {
        // Add Authorization header
        options.headers.set("Authorization", `${userAuth.value}`);
      }
    },
    onResponse({ response }) {
      // Store the token from response headers if available
      const token = response.headers.get("Authorization");
      if (token) {
        userAuth.value = token;
      }

      return response._data;
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/auth/sign-in"));
      }

      if (response.status === 404) {
        await nuxtApp.runWithContext(() => navigateTo("/dashboard"));
      }
    },
  });
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      customFetch: $customFetch as typeof globalThis.$fetch,
    },
  };
});

declare module "#app" {
  interface NuxtApp {
    $customFetch: typeof globalThis.$fetch;
  }
}

declare module "nuxt/app" {
  interface NuxtApp {
    $customFetch: typeof globalThis.$fetch;
  }
}

export {};
