<template lang="pug">
  .indBau.relative
    .indBau__chart.h-100(ref="chart")
</template>
<script>
import { format } from 'd3'
import { get } from 'lodash'
import roadmap from '~/static/content/overview/net-zero-roadmap.json'

const COLOR_PNNL = '#358D53'
const COLOR_IPCC = '#FACB3D'

function yFormatter (isPrecise) {
  const formatter = format(isPrecise ? '.1%' : '.0%')
  return val => formatter(val / 100)
}

const yValueFormatter = yFormatter(true)

export default {
  props: {
    bauStats: {
      type: Array,
      required: true
    },
    ciStats: {
      type: Array,
      required: true
    },
    companyMap: {
      type: Object,
      required: true
    },
    yMax: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      c3Handler: null
    }
  },
  computed: {
    companyAbbrMap () {
      return Object.keys(this.companyMap).reduce((ret, id) => {
        const company = this.companyMap[id]
        ret[company.公司簡稱] = company
        return ret
      }, {})
    },
    chartData () {
      const data = {}
      const colors = {}
      const annualData = this.bauStats.reduce((sum, row) => {
        const year = row.年份
        const company = this.companyMap[row.統編]
        if (!sum[year]) {
          sum[year] = {}
        }
        sum[year][company.公司簡稱] = row.Tot變化
        return sum
      }, {})

      roadmap.forEach((row) => {
        annualData[row.year].PNNL = row.PNNL * 100
        annualData[row.year].IPCC = row.IPCC * 100
      })

      // use 基準年 as basis
      const allCompanies = Object.keys(annualData['2019'])

      allCompanies.forEach((companyName) => {
        data[companyName] = [companyName]
        colors[companyName] = get(this.companyAbbrMap, `${companyName}.color`, '#000')
      })
      colors.PNNL = COLOR_PNNL
      colors.IPCC = COLOR_IPCC

      const yearList = Object.keys(annualData).sort()

      yearList.forEach((year) => {
        allCompanies.forEach((companyName) => {
          let value = annualData[year][companyName]
          if (value === undefined) {
            value = null
          }
          data[companyName].push(value)
        })
      })

      const xData = ['x', ...yearList.map(y => `${y}-01-01`)]

      return {
        x: 'x',
        columns: [
          xData,
          ...Object.values(data)
        ],
        type: 'line',
        types: {
          IPCC: 'area',
          PNNL: 'area'
        },
        colors
      }
    },
    c3Config () {
      return {
        tooltip: {
          grouped: false,
          contents: this.genTooltip
        },
        point: { r: 2 },
        grid: { y: { show: true } },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              count: 8,
              format: '%Y'
            }
          },
          y: {
            max: this.yMax,
            tick: {
              format: yFormatter()
            }
          }
        },
        legend: {
          show: false
        }
      }
    }
  },
  watch: {
    bauStats () {
      this.updateChart()
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      const c3 = require('c3')
      this.c3Handler = c3.generate({
        data: this.chartData,
        ...this.c3Config,
        bindto: this.$refs.chart
      })
    },
    updateChart () {
      if (!this.c3Handler) {
        this.initChart()
        return
      }
      this.c3Handler.axis.max({ y: this.yMax })
      this.c3Handler.load({
        unload: true,
        columns: this.chartData.columns
      })
    },
    genTooltipValueLabel (value) {
      const diff = value - 100
      if (diff > 0) {
        return `<div class="esgTp__value esgTp__value--raise">↑ ${yValueFormatter(diff)}</div>`
      } else if (diff < 0) {
        return `<div class="esgTp__value esgTp__value--reduce">↓ ${yValueFormatter(diff * -1)}</div>`
      }
      return '<div class="esgTp__value flex-none">&nbsp; 0</div>'
    },
    genTooltipRow (title, color, value, type = '') {
      let rowClass = 'esgTp__row'
      if (type) {
        rowClass += ` esgTp__row--${type}`
      }
      return `
<div class="${rowClass} flex items-center">
  <div class="esgTp__legend flex-none" style="background: ${color}"></div>
  <div class="esgTp__name flex-auto truncate">${title}</div>
  ${this.genTooltipValueLabel(value)}
</div>
`
    },
    genTooltip (data, titleFormat, valueFormat, color) {
      const year = data[0].x.getFullYear()
      const comAbbr = data[0].id
      const company = this.companyAbbrMap[comAbbr] || {}

      if (!company.color) {
        // IPCC or PNNL
        return ''
      }

      const bau = data[0].value
      const bauTitle = `${comAbbr} BAU`
      const ciTitle = `${comAbbr} 目標`
      const ciRow = this.ciStats.find((row) => {
        return row.年份 === year && row.統編 === company.統編
      })

      const roadmapRow = roadmap.find(row => row.year === year)

      return `
<div class="esgTp">
  <div class="esgTp__year lh-title">${year}</div>
  <div class="esgTp__company">
    ${this.genTooltipRow(bauTitle, company.color, bau, 'bau')}
    ${ciRow ? this.genTooltipRow(ciTitle, company.color, ciRow.Tot變化, 'ci') : ''}
  </div>
  <div class="esgTp__roadmap">
    <div class="esgTp__roadmapTitle lh-title mb2">目標</div>
    ${this.genTooltipRow('PNNL', COLOR_PNNL, roadmapRow.PNNL, 'roadmap')}
    ${this.genTooltipRow('IPCC', COLOR_IPCC, roadmapRow.IPCC, 'roadmap')}
  <div>
</div>
`
    }
  }
}
</script>
<style lang="scss" scoped>
.indBau {
  &__chart ::v-deep() {
    .c3-grid {
      .c3-ygrid {
        stroke: #bbb;
        stroke-dasharray: 0rem;
      }
    }
    .c3-xgrid-focus {
      stroke-dasharray: 5 4;
      .c3-chart-lines {
        .c3-circle {
          display: none;

        &._expanded_ {
          display: inline;
          fill: #fff;
          stroke: currentColor;
          stroke-width: 2px;
        }
      }
      .c3-line {
        stroke-width: 2px;
      }
    }
    }
    .c3-chart-lines {
      .c3-circle {
        display: none;

        &._expanded_ {
          display: inline;
          fill: currentColor;
          stroke: none;
          // stroke-width: 2px;
        }
      }
    }
    .c3-axis{
      path.domain {
        stroke: #bbb;
      }
      .tick {
        line {
          stroke: #bbb;
        }
      }
      &.c3-axis-y {
        .tick {
          line {
            display: none;
            stroke: #bbb;
          }
        }
      }
    }
    .c3-lines-IPCC,
    .c3-lines-PNNL {
      display: none;
    }
    .c3-area-IPCC,
    .c3-area-PNNL {
      opacity: 0.25 !important;
    }
  }

  ::v-deep() {
    .esgTp {
      padding: 0.75rem 2rem 1.25rem 1rem;
      border: 1px solid #555;
      border-radius: 0.25rem;
      box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.08);
      background: #ffffffd9;
      width: 14rem;

      &__year {
        font-weight: 600;
      }

      &__company {
        margin: 1.25rem 0;
      }

      &__row + .esgTp__row {
        margin-top: 0.75rem;
      }

      &__legend {
        height: 0.125rem;
        width: 1rem;
        margin-right: 0.375rem;
      }

      &__name {
        font-size: 0.875rem;
        line-height: 1rem;
      }

      &__value {
        font-size: 0.875rem;
        line-height: 1rem;
        color: #000;
        white-space: nowrap;
        text-align: right;

        &--raise {
          color: #F20000;
        }

        &--reduce {
          color: #35811C;
        }
      }

      &__row--ci .esgTp {
        &__legend {
          position: relative;
          &:before,
          &:after {
            content: " ";
            position: absolute;
            width: 3px;
            height: 0.125rem;
            background: white;
          }
          &:before {
            left: 3px;
          }
          &:after {
            right: 3px;
          }
        }
      }

      &__row--roadmap .esgTp {
        &__legend {
          height: 0.875rem;
          opacity: 0.25;
        }
        &__value {
          color: #000;
        }
      }
    }
  }
}
</style>
