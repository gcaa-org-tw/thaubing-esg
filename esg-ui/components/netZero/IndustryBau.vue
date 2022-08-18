<template lang="pug">
  .indBau.relative
    .netZeroChart.h-100(ref="chart")
</template>
<script>
import { get } from 'lodash'
import { yValueFormatter, COLORS, genC3Config, companyMixin, genNetZeroCompanyChartData, CI_SUFFIX } from '~/libs/netZeroUtils'
import roadmap from '~/static/content/overview/net-zero-roadmap.json'

export default {
  mixins: [companyMixin],
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
    chartData () {
      return genNetZeroCompanyChartData({
        stats: this.bauStats,
        getUnitLabel: (row) => {
          return this.companyMap[row.統編].公司簡稱
        },
        getUnitColor: (companyAbbr) => {
          return get(this.companyAbbrMap, `${companyAbbr}.color`, '#000')
        },
        isDashed (row) {
          return !!row.是預測值
        }
      })
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
      // this.c3Handler.zoom(DEFAULT_ZOOM_RANGE)
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
    genTooltipValueLabel (value, ipccValue) {
      const diff = value - 100
      if (diff > 0) {
        return `<div class="esgLegend__value esgLegend__value--raise">↑ ${yValueFormatter(diff)}</div>`
      } else if (diff === 0) {
        return '<div class="esgLegend__value flex-none">&nbsp; --</div>'
      } else if (value >= ipccValue) {
        return `<div class="esgLegend__value esgLegend__value">↓ ${yValueFormatter(diff * -1)}</div>`
      } else {
        return `<div class="esgLegend__value esgLegend__value--reduce">↓ ${yValueFormatter(diff * -1)}</div>`
      }
    },
    genTooltipRow (title, color, value, ipccValue, type = '') {
      let rowClass = 'esgLegend'
      if (type) {
        rowClass += ` esgLegend--${type}`
      }
      return `
<div class="${rowClass} flex items-center">
  <div class="esgLegend__label flex-none" style="background: ${color}"></div>
  <div class="esgLegend__name flex-auto truncate">${title}</div>
  ${this.genTooltipValueLabel(value, ipccValue)}
</div>
`
    },
    genTooltip (data, titleFormat, valueFormat, color) {
      const year = data[0].x.getFullYear()
      let comAbbr = data[0].id
      let isDashed = false
      if (comAbbr.endsWith(CI_SUFFIX)) {
        isDashed = true
        comAbbr = comAbbr.slice(0, CI_SUFFIX.length * -1)
      }
      const company = this.companyAbbrMap[comAbbr] || {}

      if (!company.color) {
        // IPCC or PNNL
        return ''
      }

      const bau = data[0].value
      const bauTitle = `${comAbbr}${isDashed ? ' BAU' : ''}`
      const ciTitle = `${comAbbr} 目標`
      const ciRow = this.ciStats.find((row) => {
        return row.年份 === year && row.統編 === company.統編
      })

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
    ${this.genTooltipRow(bauTitle, company.color, bau, roadmapRow.IPCC, isDashed ? 'bau' : 'fact')}
    ${ciRow ? this.genTooltipRow(ciTitle, company.color, ciRow.Tot變化, roadmapRow.IPCC, 'noLabel') : ''}
  </div>
  <div class="esgTp__roadmap">
    <div class="esgTp__roadmapTitle lh-title mb2">目標</div>
    ${this.genTooltipRow('IPCC', COLORS.IPCC, roadmapRow.IPCC, roadmapRow.IPCC, 'roadmap')}
    ${this.genTooltipRow('PNNL', COLORS.PNNL, roadmapRow.PNNL, roadmapRow.IPCC, 'roadmap')}
  <div>
</div>
`
    }
  }
}
</script>
<style lang="scss" scoped>
.indBau {
  height: 22.5rem;
}
</style>
