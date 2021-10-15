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
      .industry__catNav.dim(
        v-for="cat in catList"
        :key="cat.type"
        :class="{'industry__catNav--active': activeCat === cat.type}"
        @click="visitCat(cat)"
      ) {{cat.label}}
    .container
      .industry__scroller(@scroll="checkTablePosition")
        table.industry__stats.stats.mv3.ba.b--moon-gray(:class="{'stats--float': !isFirstColumnVisible}")
          thead.stats__header.stats__header--pri
            th
            th.stats__value.stats__value--begin(
              v-for="column in esgColumns"
              :key="column.key"
              v-if="column.span"
              :colspan="column.span"
            ) {{column.subCat}}
          thead.stats__header.stats__header--sub
            th(ref="company-column") 公司名稱
            th.pointer.stats__value(
              v-for="column in esgColumns"
              :key="column.key"
              @click="toggleSort(column)"
              :class="{'stats__value--begin': column.isSubCatBegin}"
              :ref="catAnchor(column)"
            )
              intersect(@enter="enterColumn(column)")
                .flex.items-start.justify-end
                  div
                    .pre.overflow-hidden {{beautyMeasure(column)}}
                    .f6(v-if="column.unit") ({{column.unit}})
                  i.fr.fas.ml2.mt1(:class="thClass(column)")
          tbody.stats__body
            tr(v-for="row in visibleStats" :key="row.company.統編")
              th
                nuxt-link.dim(:to="companyUrl(row.company)") {{row.company.公司簡稱}}
              td.stats__value(
                v-for="column in esgColumns"
                :key="column.key"
                :class="{'stats__value--begin': column.isSubCatBegin}"
              )
                span(:class="{'light-silver': column.isFake}") {{beautyValue(row, column)}}
    .industry__footer.flex.items-center.justify-end.container
      a.industry__cta.db.br2.pv2.ph3.fw6.white(
        :href="`/content/industry/${industry}.csv`"
      ) 下載此頁資料
</template>
<script>
import Intersect from 'vue-intersect'
import { get, throttle } from 'lodash'
import { friendlyHeader } from '~/libs/crawlerFriendly'
import industries from '~/assets/industries.json'
import esgColumns from '~/assets/esgColumns'

const CAT_LIST = [
  { type: 'environment', label: 'E 環境' },
  { type: 'social', label: 'S 社會' },
  { type: 'governance', label: 'G 治理' }
]

const MAX_CHART_PER_COLUMN = 5
const REFRESH_PERIOD = 100

function enrichColumns (category) {
  let spanCursor
  return esgColumns[category].map((column) => {
    const richColumn = {
      ...column,
      key: `${column.subCat}-${column.measure}`,
      cat: category,
      isSubCatBegin: false,
      span: 0
    }
    if (!spanCursor || richColumn.subCat !== spanCursor.subCat) {
      richColumn.isSubCatBegin = true
      if (!spanCursor) {
        richColumn.isCatBegin = true
      }
      spanCursor = richColumn
    }
    spanCursor.span += 1
    return richColumn
  })
}

export default {
  components: {
    Intersect
  },
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
      isAsc: false,

      activeCat: 'environment',
      isFirstRowVisible: true,
      isFirstColumnVisible: true
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
    catList () {
      return CAT_LIST
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
    enterColumn (column) {
      // TODO: make intersection more robust in table
      // this.activeCat = column.cat
    },
    checkTablePosition: throttle(function (ev) {
      const target = ev.target
      this.isFirstRowVisible = target.scrollTop === 0
      this.isFirstColumnVisible = target.scrollLeft === 0
    }, REFRESH_PERIOD),
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
    visitCat (cat) {
      const ref = this.$refs[`cat-${cat.type}`]
      if (!ref || ref.length < 1) {
        return
      }
      const companyTh = this.$refs['company-column']
      const th = ref[0]
      const scroller = th.offsetParent
      scroller.scroll({
        left: th.offsetLeft - companyTh.clientWidth - 1,
        top: scroller.scrollTop,
        behavior: 'smooth'
      })
      this.activeCat = cat.type
    },
    catAnchor (column) {
      if (column.isCatBegin) {
        return `cat-${column.cat}`
      }
      return ''
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
$xxl-space: 8.125rem;
$xl-space: 5rem;
$l-space: 2rem;
$nl-space: 1rem;

.container {
  padding-left: $nl-space;
  padding-right: $nl-space;
  @include xxl-screen {
    padding-left: $xxl-space;
    padding-right: $xxl-space;
  }
  @include xl-screen {
    padding-left: $xl-space;
    padding-right: $xl-space;
  }
  @include l-screen {
    padding-left: $l-space;
    padding-right: $l-space;
  }
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
    // opacity: 50%;
    font-size: 1.5rem;
    line-height: 1.25;
    cursor: pointer;
    // &--active {
    //   opacity: 100%;
    // }
  }
  &__footer {
    margin-top: 1.5rem;
    margin-bottom: 3rem;
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
    transition: filter 100ms ease-in;
  }

  th, td {
    padding: 0.375rem 0.5rem;
  }
  &__value {
    &--begin:not(:nth-child(2)) {
      border-left: 2px solid #00000026;
    }
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

        &.stats__value--begin {
          border-color: #ffffff26;
        }
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
    tr {
      &:not(:last-child) {
        td, th {
          border-bottom: 2px solid #EBEDEB;
        }
      }
      &:hover {
        td, th {
          background: #f4f4f4;
          a {
            color: #35811C;
          }
        }
      }
    }
  }
  &--float {
    th:first-child {
      filter: drop-shadow(4px 0px 5px rgba(0, 0, 0, 0.1));
    }
  }
}
</style>