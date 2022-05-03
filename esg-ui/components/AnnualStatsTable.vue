<template lang="pug">
  .ast
    .ast__nav.container.flex-ns.items-end
      .flex.mt3.mt0-ns
        .ast__catNav.dim(
          v-for="cat in catList"
          :key="cat.type"
          :class="[`ast__catNav--${cat.type}`]"
          @click="visitCat(cat)"
        ) {{cat.label}}
    .container
      .ast__scroller(@scroll="checkTablePosition")
        table.ast__stats.stats.mv3.ba.b--moon-gray(:class="{'stats--float': !isFirstColumnVisible}")
          thead.stats__header.stats__header--pri
            th
            th.stats__value.stats__value--begin(
              v-for="column in esgColumns"
              :key="column.key"
              v-if="column.span"
              :colspan="column.span"
            )
              div {{column.subCat}}
          thead.stats__header.stats__header--sub
            th(ref="company-column") 公司名稱
            th.pointer.stats__value(
              v-for="column in esgColumns"
              :key="column.key"
              @click="toggleSort(column)"
              :class="{'stats__value--begin': column.isSubCatBegin, [`stats__value--${column.cat}`]: true}"
              :ref="catAnchor(column)"
            )
              intersect(@enter="enterColumn(column)")
                .flex.items-start.justify-end(:title="thTitle(column)")
                  div
                    .pre.overflow-hidden {{beautyMeasure(column)}}
                    .f6(v-if="column.unit") ({{column.unit}})
                  .ml2.mt1.flex.flex-column.items-center
                    i.o-80.mb1.fas.fa-copyright(v-if="column.isSelfReport")
                    i.fas(:class="thClass(column)")
          tbody.stats__body
            tr(v-for="row in visibleStats" :key="row.company.統編")
              th
                company-abbr(:company="row.company")
              td.stats__value(
                v-for="column in esgColumns"
                :key="column.key"
                :class="{'stats__value--begin': column.isSubCatBegin}"
              )
                stats-value(:row="row" :column-meta="column" :quartile="quartile")
</template>
<script>
import Intersect from 'vue-intersect'
import { get, throttle } from 'lodash'
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
  return esgColumns[category]
    .filter(column => !column.onlyDetail)
    .map((column) => {
      const richColumn = {
        ...column,
        key: `${column.subCat}-${column.measure}-${column.isSelfReport || ''}`,
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
  props: {
    companyStats: {
      type: Array,
      required: true
    },
    quartile: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      order: '溫室氣體排放-碳密集度-true',
      isAsc: false,

      activeCat: 'environment',
      isFirstRowVisible: true,
      isFirstColumnVisible: true
    }
  },
  computed: {
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
    visibleStats () {
      return [...this.companyStats].sort((a, b) => {
        const aText = get(a.stats, `${this.order}.數值`)
        const aVal = get(a.stats, `${this.order}.value`)
        const bText = get(b.stats, `${this.order}.數值`)
        const bVal = get(b.stats, `${this.order}.value`)
        if (aText === undefined) {
          return 1
        }
        if (bText === undefined) {
          return -1
        }
        if (!Number.isNaN(aVal) && !Number.isNaN(bVal)) {
          return this.isAsc ? aVal - bVal : bVal - aVal
        }
        if (!Number.isNaN(aVal)) {
          return -1
        }
        if (!Number.isNaN(bVal)) {
          return 1
        }
        return this.isAsc ? aText.localeCompare(bText) : bText.localeCompare(aText)
      })
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
    thTitle (column) {
      if (column.isSelfReport) {
        return '資料來源：CSR 報告書'
      }
      return ''
    },
    beautyMeasure (column) {
      const measure = column.measure
      if (measure.includes(' ')) {
        return measure.replace(/ /g, '\n')
      }
      if (measure.length <= MAX_CHART_PER_COLUMN) {
        return measure
      }
      const line1Len = Math.floor(measure.length / 2)
      return `${measure.slice(0, line1Len)}\n${measure.slice(line1Len)}`
    }
  }
}
</script>
<style lang="scss" scoped>
.ast {
  $banner-height: 10rem;
  $footer-height: 7rem;
  &__scroller {
    position: relative;
    z-index: 1;
    overflow: auto;
    max-height: calc(100vh - #{$banner-height} - #{$footer-height});
    min-height: 30rem;
  }
  &__nav {
    margin-top: 2.25rem;
    margin-bottom: 1.125rem;
  }
  &__catNav {
    margin-right: 2.5rem;
    font-weight: 700;
    color: #35811C;
    // opacity: 50%;
    font-size: 1.5rem;
    line-height: 1.25;
    cursor: pointer;
    // &--active {
    //   opacity: 100%;
    // }

    &--social {
      color: #1A83CF;
    }
    &--governance {
      color: #6F26CB;
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
    &--environment {
      background: $green-primary;
    }
    &--social {
      background: #1A83CF;
    }
    &--governance {
      background: #6F26CB;
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
      background: #0D0E09;
      th {
        top: 0;
        background: #0D0E09;
        text-align: left;

        &.stats__value--begin {
          border-color: #ffffff26;
          left: 5rem;
        }
      }
    }
    &--sub {
      th {
        top: $row-height;
        text-align: right;
        &:first-child {
          background: $green-primary;
        }
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
      width: 5rem;
      text-align: left;
      background: #fff;
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
