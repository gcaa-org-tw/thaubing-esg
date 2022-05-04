import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import industries from './assets/industries.json'

dayjs.extend(utc)

const companies = fs
  .readdirSync(path.join(__dirname, 'static/content/company'))
  .map(filename => filename.slice(0, -4))

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ESG 檢測儀：我們與永續轉型的距離',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/thaubing-esg/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { href: 'https://fonts.googleapis.com/css2?family=Lato&family=Noto+Sans+TC:wght@400;500;700&display=swap', rel: 'stylesheet' }
    ]
  },

  styleResources: {
    scss: [
      '~/assets/variables.scss'
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'tachyons/css/tachyons.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
    'c3/c3.min.css',
    '~/assets/global'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    ['@nuxtjs/google-analytics', {
      id: 'G-LZPET9EHHH'
    }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    dir: 'static/content',
    liveEdit: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    buildTime: dayjs.utc().format()
  },

  generate: {
    routes: [
      ...industries.map(industry => `/industry/${industry}`),
      ...companies.map(company => `/company/${company}`)
    ]
  },

  router: {
    base: process.env.NODE_ENV === 'production' ? '/thaubing-esg' : '/'
  }
}
