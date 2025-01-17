// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
      ],
  components: {
    global: true,
    dirs: ['~/components'],
  },
  plugins: [
    { src: '~/plugins/websocket.client.js', mode: 'client' },
  ],
  css: [
    '@/assets/styles/global.scss',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

})
