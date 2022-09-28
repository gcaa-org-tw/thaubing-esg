/* eslint-disable import/first */
// in case we need env var in this file
require('dotenv').config()

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { friendlyHeader } from './libs/crawlerFriendly'
import industries from './assets/industries.json'

dayjs.extend(utc)

const isProd = process.env.NODE_ENV === 'production'

const defaultHeader = friendlyHeader({
  title: 'ESG 檢測儀：我們與永續轉型的距離',
  description: '打造永續環境資料庫，推動企業永續發展。',
  coverUrl: 'og-default.jpg'
})()

export default {
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
      { name: 'format-detection', content: 'telephone=no' },
      ...defaultHeader.meta
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: 'https://thaubing-esg.gcaa.org.tw' },
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
    '~/assets/global',
    '~/assets/chart'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-components.client'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    ['@nuxtjs/google-analytics', {
      id: 'G-LZPET9EHHH'
    }],
    '~/modules/sitemapRouteGenerator'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'vue-plausible',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/sentry',
    '@nuxtjs/sitemap'
  ],

  sentry: {
    dsn: isProd ? process.env.SENTRY_DSN : '',
    disableServerSide: true,
    clientIntegrations: {
      CaptureConsole: { levels: ['error', 'warn'] }
    },

    // always inject sentry methods in all env
    logMockCalls: true,
    disabled: !isProd,
    publishRelease: {
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      // Attach commits to the release (requires that the build triggered within a git repository).
      setCommits: {
        auto: true,
        ignoreMissing: true,
        ignoreEmpty: true
      }
    },
    sourceMapStyle: 'hidden-source-map',

    config: {
      // Add native Sentry config here
      // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
      release: process.env.GITHUB_SHA || 'dev'
    }
  },

  sitemap: {
    hostname: 'https://thaubing-esg.gcaa.org.tw',
    gzip: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  buefy: {
    defaultIconPack: 'fas',
    materialDesignIcons: false
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    dir: 'static/content',
    liveEdit: false
  },

  plausible: {
    domain: 'thaubing-esg.gcaa.org.tw'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    buildTime: dayjs.utc().format(),
    isProd
  },

  generate: {
    routes: [
      // '/industry/03/',
      // '/industry/10/'
      ...industries.map(industry => `/industry/${industry.code}/`)
    ],
    concurrency: 10,
    fallback: '404.html'
  }
}
