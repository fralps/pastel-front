// Absolute site origin without trailing slash.
// Uses NUXT_PUBLIC_I18N_BASE_URL when defined, falls back to the current request origin.
export const useSiteUrl = () => {
  const baseUrl = useRuntimeConfig().public.i18n?.baseUrl;
  const requestUrl = useRequestURL();

  return ((typeof baseUrl === 'string' && baseUrl) || requestUrl.origin).replace(/\/+$/, '');
};
