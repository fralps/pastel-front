import { useFetch as useBaseFetch, useNuxtApp } from "nuxt/app";

export const useCustomFetch: typeof useBaseFetch = (request, options) => {
  // Explicit cast keeps the wrapper type-safe until Nuxt picks up the injection types.
  const { $customFetch } = useNuxtApp() as unknown as {
    $customFetch: typeof globalThis.$fetch;
  };

  return useBaseFetch(request, {
    ...options,
    $fetch: $customFetch,
  });
};
