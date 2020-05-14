import pkg from './package'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
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
    'bootstrap-vue/nuxt',
    ['nuxt-vue-material', {
      theme: 'default',
      components: ['MdDrawer', 'MdRadio', 'MdMenu', 'MdContent', 'MdList', 'MdButton',
        'MdToolbar', 'MdIcon', 'MdApp', 'MdCard', 'MdTable', 'MdField', 'MdRipple',
        'MdEmptyState', 'MdCheckbox', 'MdProgress', 'MdSnackbar', 'MdSwitch', 'MdTooltip',
        "MdTabs"
      ]
    }],

  ],

  bootstrapVue: {
    componentPlugins: ['Navbar', 'Form', 'FormInput']
  },

  /*
  ** Build configuration
  */
  build: {
  }
}
