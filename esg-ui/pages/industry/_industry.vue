<template lang="pug">
  .industry
    .industry__header.container.pv3.relative.no-repeat.cover
      .industry__about.tr
        nuxt-link.dim(to="/about") 關於計畫
      nuxt-link(to="/")
        h1.industry__title.fw6 ESG 檢測儀
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
      .industry__catNav E 環境
      .industry__catNav S 社會
      .industry__catNav G 治理
    .industry__scroller
      table.industry__stats.stats.mv3.ba.b--moon-gray
        thead.stats__header.stats__header--pri
          th
          th(
            v-for="column in esgColumns"
            :key="column.key"
            v-if="column.span"
            :colspan="column.span"
          ) {{column.subCat}}
        thead.stats__header.stats__header--sub
          th 公司名稱
          th.pointer(
            v-for="column in esgColumns"
            :key="column.key"
            @click="toggleSort(column)"
          )
            .flex.items-start.justify-end
              div
                .pre.overflow-hidden {{beautyMeasure(column)}}
                .f6(v-if="column.unit") ({{column.unit}})
              i.fr.fas.ml2.mt1(:class="thClass(column)")
        tbody.stats__body
          tr(v-for="row in visibleStats" :key="row.company.統編")
            th
              nuxt-link.dim(:to="companyUrl(row.company)") {{row.company.公司簡稱}}
            td(v-for="column in esgColumns" :key="column.key")
              span(:class="{'light-silver': column.isFake}") {{beautyValue(row, column)}}
    .industry__footer.flex.items-center.justify-end.container
      a.industry__cta.db.br2.pv2.ph3.fw6.white(
        :href="`/content/industry/${industry}.csv`"
      ) 下載此頁資料
</template>
<script>
import { get } from 'lodash'
import { friendlyHeader } from '~/libs/crawlerFriendly'
import industries from '~/assets/industries.json'
import esgColumns from '~/assets/esgColumns'

const MAX_CHART_PER_COLUMN = 5

function enrichColumns (category) {
  let spanCursor
  return esgColumns[category].map((column) => {
    const richColumn = {
      ...column,
      key: `${column.subCat}-${column.measure}`,
      cat: category,
      span: 0
    }
    if (!spanCursor || richColumn.subCat !== spanCursor.subCat) {
      spanCursor = richColumn
    }
    spanCursor.span += 1
    return richColumn
  })
}

export default {
  async asyncData ({ $content, params, redirect }) {
    try {
      const stats = await $content('industry', params.industry).fetch()
      const companyList = await $content('companyList').fetch()
      return {
        stats,
        companyList
      }
    } catch {
      redirect('/')
    }
  },
  data () {
    return {
      industry: this.$route.params.industry,
      order: `${esgColumns.environment[0].subCat}-${esgColumns.environment[0].measure}`,
      isAsc: false
    }
  },
  head: friendlyHeader({
    title () {
      return this.$route.params.industry
    }
  }),
  computed: {
    year () {
      return this.$route.query.year || '2019'
    },
    industries () {
      return industries
    },
    esgColumns () {
      return [
        ...enrichColumns('environment'),
        ...enrichColumns('social'),
        ...enrichColumns('governance')
      ]
    },
    companyStats () {
      const companyMap = this.companyList.body.reduce((map, company) => {
        if (company.自訂產業別 !== this.$route.params.industry) {
          return map
        }
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
        company.stats[`${stat.子分類}-${stat.項目}`] = stat
      })
      return Object.values(companyMap)
    },
    visibleStats () {
      return [...this.companyStats].sort((a, b) => {
        const aVal = get(a.stats, `${this.order}.數值`)
        const bVal = get(b.stats, `${this.order}.數值`)
        if (aVal === undefined) {
          return 1
        }
        if (bVal === undefined) {
          return -1
        }
        if (this.isAsc) {
          return aVal - bVal
        }
        return bVal - aVal
      })
    }
  },
  watch: {
    industry () {
      this.$router.push(`/industry/${this.industry}`)
    }
  },
  methods: {
    toggleSort (column) {
      if (column.key === this.order) {
        this.isAsc = !this.isAsc
      } else {
        this.order = column.key
        this.isAsc = true
      }
    },
    thClass (column) {
      if (column.key !== this.order) {
        return ['fa-sort']
      }
      if (this.isAsc) {
        return ['fa-sort-up']
      }
      return ['fa-sort-down']
    },
    companyUrl (company) {
      return `/company/${company.公司簡稱}`
    },
    beautyMeasure (column) {
      const measure = column.measure
      if (measure.length <= MAX_CHART_PER_COLUMN) {
        return measure
      }
      const line1Len = Math.floor(measure.length / 2)
      return `${measure.slice(0, line1Len)}\n${measure.slice(line1Len)}`
    },
    beautyValue (row, column) {
      if (column.isFake) {
        return '待解鎖'
      }
      if (!(column.key in row.stats)) {
        return '-'
      }
      const field = row.stats[column.key]
      if (!isNaN(field.value)) {
        const value = Math.round(field.value * 100) / 100
        return `${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
      }
      return `${field.數值}`
    }
  }
}
</script>
<style lang="scss" scoped>
$container-space: 8.125rem;

.container {
  padding-left: $container-space;
  padding-right: $container-space;
}
.industry {
  &__header {
    background-image: url('~/assets/tree-bg.png');
    color: white;
    line-height: 1.4;
    a {
      color: white;
    }
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

  // $banner-height: 24rem;
  $banner-height: 7rem;
  $footer-height: 7rem;
  &__scroller {
    position: relative;
    margin-left: $container-space;
    max-width: calc(100vw - #{$container-space});
    // width: 80rem;
    z-index: 1;
    overflow: auto;
    max-height: calc(100vh - #{$banner-height} - #{$footer-height});
  }
  &__nav {
    margin-top: 2.25rem;
    margin-bottom: 1.125rem;
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
  }
  &__catNav {
    margin-right: 2.5rem;
    font-weight: 600;
    color: #35811C;
    opacity: 50%;
    font-size: 1.5rem;
    line-height: 1.25;
    &--active {
      opacity: 100%;
    }
  }
  &__footer {
    margin-top: 1.5rem;
    margin-bottom: 3rem;
    padding-right: 1.5rem;
  }
  &__cta {
    background: $green-primary;
    &:hover {
      background: #35811C;
    }
  }
}

$row-height: 3.5rem;

.stats {
  margin: auto;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  th:first-child {
    position: sticky;
    left: 0;
    z-index: 2;
  }

  th, td {
    padding: 0.375rem 0.5rem;
  }

  &__header {
    th {
      position: sticky;
      height: $row-height;
      vertical-align: center;
      white-space: nowrap;
      color: #fff;
      font-weight: 400;
      &:first-child {
        z-index: 5;
        font-weight: 500;
      }

      .fa-sort {
        opacity: 0.5;
      }
    }
    &--pri {
      th {
        top: 0;
        background: #0D0E09;
        text-align: left;
      }
    }
    &--sub {
      th {
        top: $row-height;
        background: $green-primary;
        text-align: right;
      }
    }
  }
  &__body {
    td {
      background: #fff;
      vertical-align: center;
      text-align: right;
    }
    th {
      text-align: left;
      background: #fff;
      a {
        color: $green-primary;
        text-decoration: underline;
      }
    }
    tr:hover {
      td {
        background: #f4f4f4;
      }
      th {
        background: #f4f4f4;
        a {
          color: #35811C;
        }
      }
    }
  }
}
</style>
