<template lang="pug">
  .indBau.relative
    .indBau__chart.h-100(ref="chart")
</template>
<script>
import { get } from 'lodash'
import roadmap from '~/static/content/overview/net-zero-roadmap.json'

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
      colors.PNNL = '#358D53'
      colors.IPCC = '#FACB3D'

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
          grouped: false
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
              format: y => `${y}%`
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
    }
  }
}
</script>
<style lang="scss" scoped>
.indBau {
  &__chart ::v-deep {
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
}
</style>
