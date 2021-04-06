export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'The Basement Of Stinkology',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Source Directory: https://nuxtjs.org/docs/2.x/directory-structure/nuxt-config#srcdir
  srcDir: 'src/',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/composition-api.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api',
    // https://typed-vuex.roe.dev/
    'nuxt-typed-vuex',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl:
      process.env.BASE_URL ||
      'https://the-basement-309319-default-rtdb.firebaseio.com/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Global route configuration
  router: {},

  // Tailwind css configuration
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    jit: true,
    exposeConfig: false,
    config: {},
  },

  // added due to issue with async functions needing extra time
  // https://github.com/nuxt-community/composition-api/issues/44
  generate: {
    // choose to suit your project
    interval: 2000,
  },

  env: {
    baseUrl:
      process.env.BASE_URL ||
      'https://the-basement-309319-default-rtdb.firebaseio.com/',
    apiKey: 'AIzaSyDisilg5fUsKKFSjMt7f9le-xgVfTLzHeA',
  },
};
