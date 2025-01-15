// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
      ],
  components: {
    global: true,
    dirs: ['~/components'], // Directory where components are stored
  },
  plugins: [
    { src: '~/plugins/websocket.client.js', mode: 'client' },
  ],
  css: [
    '@/assets/styles/global.scss', // Custom global CSS
    '@mdi/font/css/materialdesignicons.min.css', // Material Design Icons (optional, based on your project)
  ],

})
