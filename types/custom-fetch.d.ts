declare module '#app' {
  interface NuxtApp {
    $customFetch: typeof globalThis.$fetch;
  }
}

declare module 'nuxt/app' {
  interface NuxtApp {
    $customFetch: typeof globalThis.$fetch;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $customFetch: typeof globalThis.$fetch;
  }
}

export {};
