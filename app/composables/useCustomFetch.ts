import { useFetch as useBaseFetch, useNuxtApp } from 'nuxt/app';

export const useCustomFetch: typeof useBaseFetch = (request, options) => {
  const { $customFetch } = useNuxtApp() as unknown as {
    $customFetch: typeof globalThis.$fetch;
  };

  return useBaseFetch(request, {
    ...(options as object),
    $fetch: $customFetch
  } as any);
};
