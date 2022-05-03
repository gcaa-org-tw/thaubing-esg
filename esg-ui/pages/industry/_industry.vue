<template lang="pug">
  .industry
    .industry__header.container.pv3.relative.no-repeat.cover
      .industry__about.flex.justify-end
        nuxt-link.mr3.dim(to="/about") 關於計畫
        nuxt-link.dim(to="/terms-of-service") 免則聲明
      nuxt-link(to="/")
        h1.industry__title.fw7 ESG 檢測儀
      p.industry__desp
        | 打造永續環境資料庫，推動企業永續發展。
      .industry__year.f6.o-70 資料年份：{{year}}
      a.industry__officialSite.absolute(href="https://thaubing.gcaa.org.tw/")
        img(src="~/assets/logo.png")
    .industry__nav.container.flex.items-end
      .mr5
        .f6.o-60.mb1 產業
        label.flex.items-center
          select.industry__typeSelector(v-model="industry")
            option(v-for="opt in industries" :key="opt") {{opt}}
          i.fas.fa-sort
      div
        .f6.o-60.mb1 資料年份
        label.flex.items-center
          select.industry__typeSelector(:value="year" @input="changeYear")
            option(v-for="year in yearList" :key="year") {{year}}
          i.fas.fa-sort
    .industry__fund.container(v-if="isGuanshiyinn")
      investment-teller(:stats="stats.body" :quartile="quartile" :company-map="companyMap" :year="year")
    annual-stats-table(:company-stats="companyStats" :quartile="activeQuartile")
    .industry__footer.flex.items-center.justify-end.container
      a.industry__cta.db.br2.pv2.ph3.fw7.white(:href="downloadLink") 下載此頁資料
    .container
      gcaa-footer
</template>
<script>
import Konami from 'konami'
import { friendlyHeader } from '~/libs/crawlerFriendly'
import industries from '~/assets/industries.json'

const MIN_YEAR = 2011

export default {
  async asyncData ({ $content, params, redirect }) {
    try {
      const stats = await $content('industry', params.industry).fetch()
      const quartile = await $content('industry', `${params.industry}-quartile`).fetch()
      const companyList = await $content('companyList').fetch()
      return {
        stats,
        quartile,
        companyList
      }
    } catch {
      redirect('/')
    }
  },
  data () {
    return {
      industry: this.$route.params.industry,

      isGuanshiyinn: false,
      konamiHandler: new Konami(() => { this.toggleGuanshiyinn() })
    }
  },
  head: friendlyHeader({
    title () {
      return this.$route.params.industry
    }
  }),
  computed: {
    year () {
      return this.$route.query.year || '2020'
    },
    yearList () {
      return [...new Set(this.stats.body.map(stat => stat.年份))]
        .filter(year => year >= MIN_YEAR)
        .sort((a, b) => b - a)
    },
    downloadLink () {
      return `${this.$router.options.base}content/industry/${this.industry}.csv`
    },
    industries () {
      return industries
    },
    companyMap () {
      return this.companyList.body.reduce((map, company) => {
        if (company.自訂產業別 !== this.$route.params.industry) {
          return map
        }
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
  watch: {
    industry () {
      this.$router.push(`/industry/${this.industry}`)
    }
  },
  beforeDestroy () {
    this.konamiHandler.unload()
  },
  methods: {
    changeYear (event) {
      this.$router.push({
        name: this.$route.name,
        query: {
          year: event.target.value
        },
        params: this.$route.params
      })
    },
    toggleGuanshiyinn () {
      this.isGuanshiyinn = !this.isGuanshiyinn
    }
  }
}
</script>
<style lang="scss" scoped>

.industry {
  &__header {
    background-image: url('~/assets/tree-bg.png');
    color: white;
    line-height: 1.4;
    a {
      color: white;
    }
  }
  &__nav {
    margin-top: 2.25rem;
    margin-bottom: 1.125rem;
  }
  &__title {
    font-size: 3rem;
    margin-top: 1rem;
    margin-bottom: 0;
  }
  &__desp {
    font-size: 1.5rem;
    margin: 1rem 0 1.75rem;
  }
  &__officialSite {
    right: 1.5rem;
    bottom: 1rem;
  }

  &__typeSelector {
    appearance: none;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.5rem;
    padding: 0;
    margin: 0;
    cursor: pointer;
    width: 7rem;
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
