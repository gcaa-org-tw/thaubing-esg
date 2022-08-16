<template lang="pug">
  .indCom.relative
    .indCom__chart.h-100(ref="chart")
</template>
<script>
import { get } from 'lodash'
import { COLORS, yFormatter } from '~/libs/netZeroUtils'
import roadmap from '~/static/content/overview/net-zero-roadmap.json'

export default {
  props: {
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
      const annualData = this.ciStats.reduce((sum, row) => {
        const year = row.年份
        const company = this.companyMap[row.統編]
        if (!sum[year]) {
          sum[year] = {}
        }
        sum[year][company.公司簡稱] = row.Tot變化
        return sum
      }, {})

      roadmap.forEach((row) => {
        if (!annualData[row.year]) {
          annualData[row.year] = {}
        }
        annualData[row.year].PNNL = row.PNNL * 100
        annualData[row.year].IPCC = row.IPCC * 100
      })

      // use 基準年 as basis
      const allCompanies = Object.keys(annualData['2019'])

      allCompanies.forEach((companyName) => {
        data[companyName] = [companyName]
        colors[companyName] = get(this.companyAbbrMap, `${companyName}.color`, '#000')
      })

      colors.PNNL = COLORS.PNNL
      colors.IPCC = COLORS.IPCC

      const yearList = Object.keys(annualData).sort()

      yearList.forEach((year) => {
        allCompanies.forEach((companyName) => {
          const value = annualData[year][companyName] || null
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
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y'
            }
          },
          y: {
            max: this.yMax,
            tick: {
              format: yFormatter()
            }
          }
        }
      }
    }
  },
  watch: {
    ciStats () {
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
      this.c3Handler.load({
        unload: true,
        columns: this.chartData.columns
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.indCom {
}
</style>
