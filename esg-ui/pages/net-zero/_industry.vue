<template lang="pug">
  .netZero
    .netZero__nav.esgContainer
      .f6.o-60.mb1 產業
      b-dropdown.netZero__typeSelector(aria-role="menu")
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
    .mw8.center.pa3.mv4 {{stats}}
</template>
<script>
import { uniqBy } from 'lodash'
import industries from '~/assets/industries.json'

const VALID_FILTER = { top5: 'top5', all: 'all' }

export default {
  async asyncData ({ $content, params, redirect }) {
    try {
      const stats = await $content('industry', `${params.industry}-bau`).fetch()
      const existedCompany = uniqBy(stats.body, '統編').reduce((sum, company) => {
        sum[company.統編] = true
        return sum
      }, {})
      const allCompanyList = await $content('companyList').fetch()
      const companyList = allCompanyList.body.filter((company) => {
        return company.統編 in existedCompany
      })
      return {
        stats,
        companyList
      }
    } catch {
      redirect('/')
      return { stats: [], companyList: [] }
    }
  },
  computed: {
    industry () {
      // default 石化業
      const code = this.$route.params.industry || '03'
      const industry = industries.find(needle => needle.code === code)
      return industry || industries[0]
    },
    industries () {
      return industries
    },
    filter () {
      const code = this.$route.query.filter
      return VALID_FILTER[code] ? code : VALID_FILTER.top5
    },
    companyCount () {
      return Object.keys(this.companyList).length
    },
    top5Company () {
      const lastRecordPerCompany = this.stats.body.reduce((sum, row) => {
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
    },
    top5Count () {
      return this.top5Company.length
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
    ::v-deep {
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
    font-size: 1.375rem;
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
  }
}
</style>
