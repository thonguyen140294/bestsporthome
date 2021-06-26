import crypto from 'crypto'
import path from 'path'
import { getSiteMapProd } from './config/sitemap'

const BUILDID = crypto.randomBytes(10).toString('hex')

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1.0'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Bestsporthome | Cung cấp trang phục và phụ kiện đá bóng Đà Nẵng'
      },
      process.env.NOINDEX === '1' ? {
        name: 'robots',
        content: 'noindex'
      } : {}
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['swiper/css/swiper.css', 'static/assets/scss/app.scss'],
  /*
   ** Style resources configuration
   */
  styleResources: {
    scss: [
      'static/assets/scss/_variables.scss',
      'static/assets/scss/_mixin.scss',
      'static/assets/scss/_animation.scss',
      'static/assets/scss/_typo.scss'
    ]
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    '~/plugins/vue-lazysizes.client.js',
    '~/plugins/vue-swal',
    '~/plugins/global',
    '~/plugins/inject',
    '~/plugins/route',
    {
      src: '~/plugins/vue-swiper-plugin.js',
      ssr: false
    },
    {
      src: '~/plugins/vuex-persistedstate.js',
      ssr: false
    },
    {
      src: '~/plugins/datepicker',
      ssr: false
    },
    { src: '~/plugins/vuelidate' }
  ],
  loading: {
    color: '#f2c94c',
    height: '3px'
  },
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,
  env: {
    BUILDID,
    API_URL: process.env.API_URL
  },
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxtjs/eslint-module', '@nuxt/image', 'nuxt-font-loader'],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    'vue-scrollto/nuxt',
    '@nuxtjs/device',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    'nuxt-user-agent',
    'nuxt-clipboard2',
    '@nuxtjs/robots',
    '@nuxtjs/redirect-module',
    '@nuxtjs/component-cache',
    '@nuxtjs/sitemap',
    '@/modules/axCache',
    'nuxt-webfontloader',
    ['cookie-universal-nuxt', { parseJSON: false }],
    '@nuxtjs/robots'
  ],
  robots: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        UserAgent: '*',
        Allow: '*',
        Sitemap: () => `${process.env.DOMAIN}/sitemap.xml`
      }
    } else {
      return {
        UserAgent: '*',
        Disallow: '/',
        Sitemap: () => `${process.env.DOMAIN}/sitemap.xml`
      }
    }
  },
  sitemap: process.env.NODE_ENV === 'production' ? getSiteMapProd : false,
  axios: {
    baseURL: process.env.API_URL
  },
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: false,
    components: [
      'BModal',
      'BPopover',
      'BTab',
      'BTabs',
      'BCollapse',
      'BNav',
      'BNavItem',
      'BDropdownItem',
      'BDropdown',
      'BToast',
      'BCard',
      'BCardHeader',
      'BCardBody',
      'BNavItemDropdown',
      'BProgress'
    ],
    directives: ['VBModal', 'VBPopover', 'VBTooltip', 'VBToggle']
  },
  fontLoader: {
    url: 'https://fonts.googleapis.com/css2?family=Be+Vietnam:wght@400;500;700&display=swap',
    prefetch: true,
    preconnect: true
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: process.env.PUBLIC_URL || '/_nuxt/',
    parallel: true,
    extractCSS: true,
    optimizeCSS: true,
    filenames: {
      css: `${BUILDID}.[name].css`
    },
    babel: {
      compact: true
    },
    optimization: {
      minimize: true
    },
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: true,
      cacheGroups: {}
    },
    webfontloader: {
      google: {
        families: ['Be Vietnam:400,500,700']
      }
    },
    loaders: {
      cssModules: {
        modules: {
          localIdentName: '[hash:base64:4]'
        }
      }
    },
    extend (config, { isDev, isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }
      config.resolve.alias['~common'] = path.join(__dirname, 'components/common')
      config.resolve.alias['~account'] = path.join(__dirname, 'components/account')
      config.resolve.alias['~info'] = path.join(__dirname, 'components/info')
      config.resolve.alias['~layouts'] = path.join(__dirname, 'components/layouts')
      config.resolve.alias['~lobby'] = path.join(__dirname, 'components/lobby')
      config.resolve.alias['~pages'] = path.join(__dirname, 'components/pages')
      config.resolve.alias['~support'] = path.join(__dirname, 'components/support')
      config.resolve.alias['~user'] = path.join(__dirname, 'components/user')
      config.resolve.alias['~scssAsset'] = path.join(__dirname, 'static/assets/scss/components')
      config.resolve.alias['~imageAsset'] = path.join(__dirname, 'static/assets/images/components')
      config.resolve.alias['~imageRoot'] = path.join(__dirname, 'static/assets/images')
    }
  },
  router: {
    middleware: 'trailingSlashRedirect',
    scrollBehavior (to, from, savedPosition) {
      // savedPosition is only available for popstate navigations.
      if (savedPosition) { return savedPosition }

      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      if (to.params.savePosition) { return {} }

      // scroll to anchor by returning the selector
      if (to.hash) {
        const position = { selector: to.hash }

        // specify offset of the element
        // if (to.hash === '#anchor2') {
        //   position.offset = { y: 100 }
        // }
        return position
      }

      // scroll to top by default
      return { x: 0, y: 0 }
    }
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  server: {
    port: 6670
  }
}
