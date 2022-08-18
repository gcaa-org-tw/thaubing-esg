<template lang="pug">
  .netZero
    .netZero__nav.esgContainer
      .f6.o-60.mb1 產業
      b-dropdown.netZero__typeSelector(aria-role="menu" :scrollable="true" max-height="22rem")
        template(slot="trigger")
          button.flex.justify-between.items-center.w-100.pointer
            .black.f3.flex-auto.tl {{industry.label}}
            i.fas.fa-sort.flex-none
        b-dropdown-item(v-for="opt in industries" :key="opt.code" aria-role="menuitem" :has-link="true")
          nuxt-link(:to="industryLink(opt.code)") {{opt.label}}
      .netZero__filter.flex.items-center
        nuxt-link.netZero__filterItem(
          :class="{'netZero__filterItem--active': filter === 'top5'}"
          :to="filterLink('top5')"
        ) {{industry.label}}碳排大戶 ({{top5Count}})
        nuxt-link.netZero__filterItem.pointer(
          :class="{'netZero__filterItem--active': filter === 'all'}"
          :to="filterLink('all')"
        ) 所有公司 ({{companyCount}})
    .netZero__legend.thinContainer
      .netZero__legendRow
        net-zero-legend(
          v-for="company in activeCompanyList"
          :key="company.統編"
          :title="company.公司簡稱"
          :color="company.color"
        )
      .netZero__legendRow
        net-zero-legend(title="IPCC" :color="chartColors.IPCC" type="roadmap")
        net-zero-legend(title="PNNL" :color="chartColors.PNNL" type="roadmap")
    .netZero__chart.thinContainer
      h2 企業維持原狀的碳排成長 {{yMax}}
      net-zero-industry-bau(
        :bau-stats="visibleBauStats"
        :ci-stats="visibleCiStats"
        :company-map="activeCompanyMap"
        :y-max="yMax"
      )
    .netZero__chart.thinContainer
      h2 企業淨零目標路線
      net-zero-industry-commitment(
        :ci-stats="visibleCiStats"
        :bau-stats="visibleBauStats"
        :company-map="activeCompanyMap"
        :y-max="yMax"
      )

</template>
<script>
import { interpolateCividis } from 'd3'
import { uniqBy } from 'lodash'
import { COLORS, industryMixin, PER_INDUSTRY_KEY, Y_MAX } from '~/libs/netZeroUtils'

const VALID_FILTER = { top5: 'top5', all: 'all' }

export default {
  mixins: [industryMixin],
  async asyncData ({ $content, params, redirect }) {
    let bauStats = []
    let companyList = []
    let ciStats = []

    try {
      bauStats = await $content('industry', `${params.industry}-bau`).fetch()
    } catch {
      if (params.industry !== PER_INDUSTRY_KEY) {
        redirect('/')
      }
      return { bauStats, ciStats, companyList }
    }

    bauStats = bauStats.body.map((row) => {
      return {
        ...row,
        年份: row.年份 - 0,
        Tot數值: row.Tot數值 - 0,
        Tot變化: row.Tot變化 - 0
      }
    })

    try {
      ciStats = await $content('industry', `${params.industry}-net-zero-commitment`).fetch()
      ciStats = ciStats.body.map((row) => {
        return {
          ...row,
          年份: row.年份 - 0,
          Tot變化: row.Tot變化 - 0
        }
      })
    } catch {
      // it's ok
    }

    const existedCompany = uniqBy([...bauStats, ...ciStats], '統編')
      .reduce((sum, company) => {
        sum[company.統編] = true
        return sum
      }, {})

    const allCompanyList = await $content('companyList').fetch()
    companyList = allCompanyList.body
      .filter((company) => {
        return company.統編 in existedCompany
      })

    const nCompany = companyList.length
    companyList = companyList.map((company, i) => {
      return {
        ...company,
        color: interpolateCividis(i / nCompany)
      }
    })
    return { bauStats, ciStats, companyList }
  },
  computed: {
    industry () {
      // default 石化業
      const code = this.$route.params.industry || '03'
      const industry = this.industries.find(needle => needle.code === code)
      return industry || this.industries[0]
    },
    filter () {
      const code = this.$route.query.filter
      return VALID_FILTER[code] ? code : VALID_FILTER.top5
    },
    companyCount () {
      return Object.keys(this.companyList).length
    },
    companyMap () {
      return this.companyList.reduce((sum, company) => {
        sum[company.統編] = company
        return sum
      }, {})
    },
    top5CompanyMap () {
      const lastRecordPerCompany = this.bauStats.reduce((sum, row) => {
        if (row.是預測值) {
          return sum
        }
        const year = row.年份
        const value = row.Tot數值
        const id = row.統編
        if (!sum[id]) {
          sum[id] = { id, year, value }
        } else if (sum[id].year < year) {
          sum[id] = { id, year, value }
        }
        return sum
      }, {})
      return Object.values(lastRecordPerCompany)
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
        .reduce((ret, company) => {
          ret[company.id] = this.companyMap[company.id]
          return ret
        }, {})
    },
    activeCompanyMap () {
      if (this.filter === VALID_FILTER.all) {
        return this.companyMap
      }
      return this.top5CompanyMap
    },
    activeCompanyList () {
      return Object.values(this.activeCompanyMap)
    },
    yMax () {
      return [...this.visibleBauStats, ...this.visibleCiStats].reduce((max, row) => {
        if (max === Y_MAX.MAX) {
          return max
        }
        if (row.Tot變化 > max) {
          return Math.min(row.Tot變化, Y_MAX.MAX)
        }
        return max
      }, Y_MAX.MIN)
    },
    visibleBauStats () {
      return this.bauStats.filter((row) => {
        return row.統編 in this.activeCompanyMap
      })
    },
    visibleCiStats () {
      return this.ciStats.filter((row) => {
        return row.統編 in this.activeCompanyMap
      })
    },
    top5Count () {
      return Object.values(this.top5CompanyMap).length
    },
    chartColors () {
      return COLORS
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
        params: {
          industry
        },
        query: this.$route.query
      }
    },
    filterLink (filter) {
      return {
        name: this.$route.name,
        params: this.$route.params,
        query: {
          filter
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.netZero {
  &__nav {
    margin-top: 2.25rem;
    margin-bottom: 1.125rem;
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

  &__filter {
    margin: 1.75rem 0 2.25rem;
  }

  &__filterItem {
    line-height: 1.18;
    color: #4A7F2EB3;
    padding-bottom: 0.375rem;
    border-bottom: 1px solid transparent;

    &--active {
      color: #35811C;
      border-color: #35811C;
    }

    &:not(:last-child) {
      margin-right: 1.75rem;
    }

    @include ns-screen {
      font-size: 1.375rem;
    }
  }

  &__legend {
    margin: 2.25rem auto 2.5rem;
  }

  &__legendRow {
    display: grid;
    grid-template-columns: repeat(auto-fit, 9.5rem);
    row-gap: 0.5rem;
    column-gap: 1rem;

    + .netZero__legendRow {
      margin-top: 1.25rem;
    }
  }

  &__chart {
    margin: 2.5rem auto;

    h2 {
      font-size: 1.375rem;
      margin-bottom: 1.75rem;
      color: #000;
    }
  }
}
</style>
