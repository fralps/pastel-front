import { useFetch as useBaseFetch, useNuxtApp } from 'nuxt/app';

export const useCustomFetch: typeof useBaseFetch = (
  request: Parameters<typeof useBaseFetch>[0],
  options?: Parameters<typeof useBaseFetch>[1]
) => {
  const { $customFetch } = useNuxtApp() as unknown as {
    $customFetch: typeof globalThis.$fetch;
  };

  return useBaseFetch(request, {
    ...(options as object),
    $fetch: $customFetch
  } as any);
};
