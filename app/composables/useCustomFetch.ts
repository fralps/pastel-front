import { useFetch as useBaseFetch, useNuxtApp } from 'nuxt/app';

export const useCustomFetch: typeof useBaseFetch = (request, options) => {
  // Explicit cast keeps the wrapper type-safe until Nuxt picks up the injection types.
  const { $customFetch } = useNuxtApp() as unknown as {
    $customFetch: typeof globalThis.$fetch;
  };

  // Cast to `any` to break TypeScript 7's excessive stack depth on recursive route type inference.
  // The wrapper's type signature (`typeof useBaseFetch`) still provides type safety to callers.
  return useBaseFetch(request, {
    ...options,
    $fetch: $customFetch
  } as any);
};
