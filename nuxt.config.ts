// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'zod']
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress sourcemap warnings from Nuxt internal plugins
          if (warning.plugin && (warning.plugin.startsWith('nuxt:') || warning.plugin.startsWith('@tailwindcss/'))) {
            return
          }
          // Suppress /* #__PURE__ */ annotation warnings from node_modules
          if (warning.message?.includes('/* #__PURE__ */')) {
            return
          }
          warn(warning)
        }
      }
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/mdc'
  ],
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1.0'
        }
      ]
    }
  },
  i18n: {
    strategy: 'prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' }
    ]
  },
  css: ['~/assets/css/main.css'],
  piniaPluginPersistedstate: {
    storage: 'cookies',
    debug: true,
    cookieOptions: {
      httpOnly: false,
      secure: true,
      sameSite: 'lax'
    }
  },
  typescript: {
    tsConfig: {
      include: ['./types/**/*.d.ts']
    }
  },
  devServer: {
    port: 5100
  }
});
