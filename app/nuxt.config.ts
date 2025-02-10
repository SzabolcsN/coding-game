// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'nuxt-monaco-editor',
    '@nuxtjs/tailwindcss',
  ],
  experimental: {
    crossOriginPrefetch: true,
  },
})