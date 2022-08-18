<template lang="pug">
  .overviewBau.relative
    .netZeroChart.h-100(ref="chart")
</template>
<script>
import { get } from 'lodash'
import { yValueFormatter, COLORS, DEFAULT_ZOOM_RANGE, genC3Config, YEAR } from '~/libs/netZeroUtils'
import roadmap from '~/static/content/overview/net-zero-roadmap.json'

export default {
  props: {
    bauStats: {
      type: Array,
      required: true
    },
    industryMap: {
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
    industryNameMap () {
      return Object.values(this.industryMap).reduce((sum, industry) => {
        sum[industry.label] = industry
        return sum
      }, {})
    },
    chartData () {
      const data = {}
      const colors = {}
      const annualData = this.bauStats.reduce((sum, row) => {
        const year = row.年份
        const industry = this.industryMap[row.產業別]
        if (!sum[year]) {
          sum[year] = {}
        }
        sum[year][industry.label] = row.Tot變化
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
      const allIndustries = Object.keys(annualData[YEAR.BASE])

      allIndustries.forEach((industryName) => {
        data[industryName] = [industryName]
        colors[industryName] = get(this.industryNameMap, `${industryName}.color`, '#000')
      })
      colors.PNNL = COLORS.PNNL
      colors.IPCC = COLORS.IPCC

      const yearList = Object.keys(annualData).sort()

      yearList.forEach((year) => {
        allIndustries.forEach((industryName) => {
          let value = annualData[year][industryName]
          if (value === undefined) {
            value = null
          }
          data[industryName].push(value)
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
      return genC3Config(this.yMax, {
        tooltip: {
          grouped: false,
          contents: this.genTooltip
        }
      })
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
      this.c3Handler.zoom(DEFAULT_ZOOM_RANGE)
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
        return `<div class="esgLegend__value esgLegend__value--raise">↑ ${yValueFormatter(diff)}</div>`
      } else if (diff < 0) {
        return `<div class="esgLegend__value esgLegend__value--reduce">↓ ${yValueFormatter(diff * -1)}</div>`
      }
      return '<div class="esgLegend__value flex-none">&nbsp; 0</div>'
    },
    genTooltipRow (title, color, value, type = '') {
      let rowClass = 'esgLegend'
      if (type) {
        rowClass += ` esgLegend--${type}`
      }
      return `
<div class="${rowClass} flex items-center">
  <div class="esgLegend__label flex-none" style="background: ${color}"></div>
  <div class="esgLegend__name flex-auto truncate">${title}</div>
  ${this.genTooltipValueLabel(value)}
</div>
`
    },
    genTooltip (data, titleFormat, valueFormat, color) {
      const year = data[0].x.getFullYear()
      const industryName = data[0].id
      const industry = this.industryNameMap[industryName] || {}

      if (!industry.color) {
        // IPCC or PNNL
        return ''
      }

      const bau = data[0].value
      const bauTitle = `${industryName} BAU`

      let roadmapRow = roadmap.find(row => row.year === year)

      roadmapRow = {
        ...roadmapRow,
        PNNL: roadmapRow.PNNL * 100,
        IPCC: roadmapRow.IPCC * 100
      }

      return `
<div class="esgTp">
  <div class="esgTp__year lh-title">${year}</div>
  <div class="esgTp__company">
    ${this.genTooltipRow(bauTitle, industry.color, bau, 'bau')}
  </div>
  <div class="esgTp__roadmap">
    <div class="esgTp__roadmapTitle lh-title mb2">目標</div>
    ${this.genTooltipRow('PNNL', COLORS.PNNL, roadmapRow.PNNL, 'roadmap')}
    ${this.genTooltipRow('IPCC', COLORS.IPCC, roadmapRow.IPCC, 'roadmap')}
  <div>
</div>
`
    }
  }
}
</script>
<style lang="scss" scoped>
.overviewBau {
  height: 22.5rem;
}
</style>