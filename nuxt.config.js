export default {
  ssr: false,
  target: 'static',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: "Better Call Bert",
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons' }
    ]
  },

  /*
  ** Manifest for standalone app
  */
  manifest: {
    name: 'Better Call Bert',
    short_name: 'BetterCallBert',
    display: 'standalone'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/custom-theme.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/firebase.js' },
    { src: '~/plugins/themes.js' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    ['nuxt-vue-material', {
      theme: 'default',
      components: ['MdDrawer', 'MdRadio', 'MdMenu', 'MdContent', 'MdList', 'MdButton',
        'MdToolbar', 'MdIcon', 'MdApp', 'MdCard', 'MdField',
        'MdCheckbox', 'MdSnackbar', 'MdSwitch', 'MdTooltip',
        "MdDivider", "MdDialog", "MdDialogConfirm"
      ]
    }],

  ],

  /*
  ** Build configuration
  */
  build: {
  }
}
