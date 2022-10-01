<template lang="pug">
  .industry
    .industry__nav.esgContainer.flex.items-end
      .mr5
        .f6.o-60.mb1 產業
        b-dropdown.industry__typeSelector(aria-role="menu" :scrollable="true" max-height="22rem")
          template(slot="trigger")
            button.flex.justify-between.items-center.w-100.pointer
              .black.f3.flex-auto.tl {{industry.label}}
              i.fas.fa-sort.flex-none
          b-dropdown-item(v-for="opt in industries" :key="opt.code" aria-role="menuitem" :has-link="true")
            nuxt-link(:to="industryLink(opt.code)") {{opt.label}}
      div
        .f6.o-60.mb1 資料年份
        b-dropdown.industry__typeSelector(aria-role="menu")
          template(slot="trigger")
            button.flex.justify-between.items-center.w-100.pointer
              .black.f3.flex-auto.tl {{year}}
              i.fas.fa-sort.flex-none
          b-dropdown-item(v-for="year in yearList" :key="year" aria-role="menuitem" :has-link="true")
            nuxt-link(:to="yearLink(year)") {{year}}
    .industry__fund.esgContainer(v-if="isGuanshiyinn")
      investment-teller(:stats="stats.body" :quartile="quartile" :company-map="companyMap" :year="year")
    annual-stats-table(:company-stats="companyStats" :quartile="activeQuartile")
    .industry__footer.flex.items-center.justify-end.esgContainer
      a.industry__cta.db.br2.pv2.ph3.fw7.white(:href="downloadLink" @click="trackDownload" target="_blank" rel="noopener") 下載此頁資料
    .esgContainer
      gcaa-footer
</template>
<script>
import { mapState } from 'vuex'
import { friendlyHeader } from '~/libs/crawlerFriendly'
import industries from '~/assets/industries.json'

const MIN_YEAR = 2011

export default {
  async asyncData ({ $content, params, redirect }) {
    try {
      const stats = await $content('industry', params.industry).fetch()
      const quartile = await $content('industry', `${params.industry}-quartile`).fetch()
      const allCompanyList = await $content('companyList').fetch()
      const companyList = allCompanyList.body.filter((company) => {
        return company.上市上櫃產業編碼 === params.industry
      })
      return {
        stats,
        quartile,
        companyList
      }
    } catch {
      redirect('/')
      return { stats: [], companyList: [], quartile: {} }
    }
  },
  head: friendlyHeader({
    title () {
      return this.industry.label
    }
  }),
  computed: {
    ...mapState({ isGuanshiyinn: 'isGuanshiyinn' }),
    industry () {
      // default 石化業
      const code = this.$route.params.industry || '03'
      const industry = industries.find(needle => needle.code === code)
      return industry || industries[0]
    },
    year () {
      return this.$route.query.year || '2020'
    },
    yearList () {
      return [...new Set(this.stats.body.map(stat => stat.年份))]
        .filter(year => year >= MIN_YEAR)
        .sort((a, b) => b - a)
    },
    downloadLink () {
      return `${this.$router.options.base}content/industry/${this.industry.code}.csv`
    },
    industries () {
      return industries
    },
    companyMap () {
      return this.companyList.reduce((map, company) => {
        map[company.統編] = company
        return map
      }, {})
    },
    companyStats () {
      const companyMap = Object.values(this.companyMap).reduce((map, company) => {
        map[company.統編] = {
          company,
          stats: {}
        }
        return map
      }, {})
      this.stats.body.forEach((stat) => {
        const company = companyMap[stat.統編]
        if (!company || stat.年份 !== this.year) {
          return
        }
        stat.value = Number.parseFloat(stat.數值)
        company.stats[`${stat.子分類}-${stat.項目}-${stat.來自公司報告}`] = stat
      })
      return Object.values(companyMap)
    },
    activeQuartile () {
      return this.quartile[this.year] || {}
    }
  },
  beforeDestroy () {
    // #109, when switch page, html scrollbar disabler is not reset for some reason
    const html = document.querySelector('html')
    if (html.classList.contains('is-clipped-touch')) {
      html.classList.remove('is-clipped-touch')
    }
  },
  methods: {
    industryLink (industry) {
      return {
        name: this.$route.name,
        query: {
          year: this.year
        },
        params: {
          industry
        }
      }
    },
    yearLink (year) {
      return {
        name: this.$route.name,
        query: {
          year
        },
        params: this.$route.params
      }
    },
    trackDownload () {
      this.$plausible.trackEvent('download', {
        props: {
          type: 'industry',
          id: this.industry.code
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.industry {

  &__nav {
    margin-top: 2.25rem;
    margin-bottom: 1.125rem;
  }
  &__title {
    font-size: 3rem;
    margin-top: 1rem;
    margin-bottom: 0;
  }

  &__typeSelector {
    width: 8rem;
    ::v-deep() {
      .dropdown-menu {
        min-width: 8rem;
      }
      .dropdown-trigger {
        width: 100%;

        button {
          border: none;
          outline: none;
          background: transparent;
        }
      }

      .dropdown-content {
        background: #333;
      }

      .has-link a {
        padding: 0.5rem;
        color: white;
        font-size: 1.5rem;

        &:hover {
          background: #555;
          color: white;
        }
      }
    }
  }

  &__footer {
    margin: 1.5rem 0;
  }
  &__cta {
    background: $green-primary;
    &:hover {
      background: #35811C;
    }
  }
}
</style>
