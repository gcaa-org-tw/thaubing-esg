<template lang="pug">
  chart-panel(title="企業溫室氣體年排放量趨勢與減碳目標")
    .singleCompany(slot="chart")
      .singleCompany__chart.relative
        .netZeroChart(ref="chart" :class="{'netZeroChart--blur': hasNoData}")
        .aspect-ratio--object.flex.items-center.justify-center(v-if="hasNoData")
          .f3.fw5.gray.pb4 無資料
      .mt2
        net-zero-remark(:fields="['BASE_YEAR', 'BAU', 'COMMITMENT']")
</template>
<script>
import { get } from 'lodash'
import { interpolateCividis } from 'd3'
import roadmap from '~/static/content/overview/net-zero-roadmap.json'
import { genC3Config, companyMixin, genNetZeroCompanyChartData, genTooltip, Y_MAX, YEAR, genTooltipRow, COLORS, PREDICT_SUFFIX } from '~/libs/netZeroUtils'

const META = {
  BAU: {
    LABEL: 'BAU',
    PREDICT_LABEL: `BAU${PREDICT_SUFFIX}`,
    COLOR: interpolateCividis(0)
  },
  CI: {
    LABEL: 'CI',
    PREDICT_LABEL: `CI${PREDICT_SUFFIX}`,
    COLOR: interpolateCividis(0.75)
  }
}

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
    company: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      c3Handler: null,

      genBauTooltip: genTooltip({
        isBau: true,
        // just need bau color
        findUnit () { return { color: META.BAU.COLOR } },
        findAnotherRow: (year) => {
          return this.ciStats.find(row => row.年份 === year)
        }
      }),

      genCiTooltip: genTooltip({
        isBau: false,
        // just need bau color
        findUnit () { return { color: META.BAU.COLOR } },
        findAnotherRow: (year) => {
          return this.bauStats.find(row => row.年份 === year)
        }
      })
    }
  },
  computed: {
    hasNoData () {
      return !this.bauStats.length
    },
    stats () {
      const richBauStats = this.bauStats.map((row) => {
        return {
          ...row,
          label: META.BAU.LABEL,
          isPredicted: !!row.是預測值
        }
      })
      const richCiStats = this.ciStats
        .filter(row => !row.是推估值)
        .map((row) => {
          return {
            ...row,
            label: META.CI.LABEL,
            isPredicted: true
          }
        })
      return [...richBauStats, ...richCiStats]
    },
    yMax () {
      return this.stats.reduce((max, row) => {
        if (max === Y_MAX.MAX) {
          return max
        }
        if (row.Tot變化 > max) {
          return Math.min(row.Tot變化, Y_MAX.MAX)
        }
        return max
      }, Y_MAX.MIN)
    },
    chartData () {
      return genNetZeroCompanyChartData({
        stats: this.stats,
        getUnitLabel: (row) => {
          return row.label
        },
        getUnitColor: (label) => {
          return get(META, `${label}.COLOR`, '')
        },
        isDashed (row, year) {
          // skip 2013
          if (year - 0 === YEAR.START) {
            return false
          }
          // commitment data contain hole
          return !('isPredicted' in row) || !!row.isPredicted
        },
        allUnits: ['IPCC', 'PNNL', META.BAU.LABEL, META.CI.LABEL]
      })
    },
    c3Config () {
      return genC3Config(this.yMax, {
        line: { connectNull: true },
        tooltip: {
          // grouped: false,
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
    genTooltip (data) {
      const year = data[0].x.getFullYear()
      const valueMap = data.reduce((sum, value) => {
        sum[value.id] = value.value
        return sum
      }, {})

      let bauTitle = this.company.公司簡稱
      let bauValue = valueMap[META.BAU.LABEL]
      const isDashed = valueMap[META.BAU.PREDICT_LABEL] !== null
      if (isDashed) {
        bauTitle += ' BAU'
        bauValue = valueMap[META.BAU.PREDICT_LABEL]
      }

      const ciTitle = `${this.company.公司簡稱} 目標`
      const ci = this.ciStats.find(row => row.年份 === year)

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
${genTooltipRow(bauTitle, META.BAU.COLOR, bauValue, roadmapRow.IPCC, isDashed ? 'bau' : 'fact')}
${ci ? genTooltipRow(ciTitle, META.CI.COLOR, ci.Tot變化, roadmapRow.IPCC, 'noLabel') : ''}
</div>
<div class="esgTp__roadmap">
<div class="esgTp__roadmapTitle lh-title mb2">目標</div>
${genTooltipRow('IPCC', COLORS.IPCC, roadmapRow.IPCC, roadmapRow.IPCC, 'roadmap')}
${genTooltipRow('PNNL', COLORS.PNNL, roadmapRow.PNNL, roadmapRow.IPCC, 'roadmap')}
<div>
</div>
`
    }
  }
}
</script>
<style lang="scss" scoped>
.singleCompany {
  &__chart {
    height: 22.5rem;
  }
}
</style>
