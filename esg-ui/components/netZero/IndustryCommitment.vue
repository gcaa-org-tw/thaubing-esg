<template lang="pug">
  .indCom.relative
    .netZeroChart.h-100(ref="chart")
</template>
<script>
import { get } from 'lodash'
import { yValueFormatter, COLORS, genC3Config, companyMixin, genNetZeroCompanyChartData } from '~/libs/netZeroUtils'
import roadmap from '~/static/content/overview/net-zero-roadmap.json'

export default {
  mixins: [companyMixin],
  props: {
    ciStats: {
      type: Array,
      required: true
    },
    bauStats: {
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
        stats: this.ciStats,
        getUnitLabel: (row) => {
          return this.companyMap[row.統編].公司簡稱
        },
        getUnitColor: (companyAbbr) => {
          return get(this.companyAbbrMap, `${companyAbbr}.color`, '#000')
        },
        isDashed (row) {
          return !!row.是承諾值
        }
      })
    },
    c3Config () {
      return genC3Config(this.yMax, {
        // tooltip: {
        //   grouped: true,
        //   contents: this.genTooltip
        // }
      })
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
      const comAbbr = data[0].id
      const company = this.companyAbbrMap[comAbbr] || {}

      if (!company.color) {
        // IPCC or PNNL
        return ''
      }

      const ci = data[0].value
      const ciTitle = `${comAbbr} 目標`
      const bauTitle = `${comAbbr} BAU`
      const bauRow = this.bauStats.find((row) => {
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
    ${bauRow ? this.genTooltipRow(bauTitle, company.color, bauRow.Tot變化, 'bau') : ''}
    ${this.genTooltipRow(ciTitle, company.color, ci, 'ci')}
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
.indCom {
  height: 22.5rem;
}
</style>
