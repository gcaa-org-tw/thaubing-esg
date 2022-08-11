<template lang="pug">
  .indBau.relative
    .indBau__chart.h-100(ref="chart")
</template>
<script>
import roadmap from '~/static/content/overview/net-zero-roadmap.json'

export default {
  props: {
    bauStats: {
      type: Array,
      required: true
    },
    companyMap: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      c3Handler: null
    }
  },
  computed: {
    chartData () {
      const data = {}
      const annualData = this.bauStats.reduce((sum, row) => {
        const year = row.年份
        const company = this.companyMap[row.統編]
        if (!sum[year]) {
          sum[year] = {}
        }
        sum[year][company.公司簡稱] = row.Tot變化 - 0
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
      })

      const yearList = Object.keys(annualData).sort()

      yearList.forEach((year) => {
        allCompanies.forEach((companyName) => {
          const value = annualData[year][companyName] || null
          data[companyName].push(value)
        })
      })

      const xData = ['x', ...yearList]

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
        }
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
          }
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
        ...this.c3config,
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
.indBau {
}
</style>
