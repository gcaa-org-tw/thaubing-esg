<template lang="pug">
  .indBau.relative
    .netZeroChart.h-100(ref="chart")
</template>
<script>
import { get } from 'lodash'
import { genC3Config, companyMixin, genNetZeroCompanyChartData, genTooltip, focusUnit } from '~/libs/netZeroUtils'

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
    },
    activeCompany: {
      default: null,
      validator (val) {
        return !val || val.公司簡稱
      }
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
          return get(this.companyAbbrMap, `${companyAbbr}.color`, '')
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
          contents: genTooltip({
            isBau: true,
            findUnit: (companyAbbr) => {
              return this.companyAbbrMap[companyAbbr]
            },
            findAnotherRow: (year, company) => {
              return this.ciStats.find((row) => {
                return row.年份 === year && row.統編 === company.統編
              })
            }
          })
        }
      })
    }
  },
  watch: {
    bauStats () {
      this.updateChart()
    },
    activeCompany () {
      const companyName = get(this.activeCompany, '公司簡稱')
      focusUnit(companyName, this.c3Handler)

      if (companyName) {
        this.$refs.chart.classList.add('netZeroChart--hasFocused')
      } else {
        this.$refs.chart.classList.remove('netZeroChart--hasFocused')
      }
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
      focusUnit(null, this.c3Handler)
    }
  }
}
</script>
<style lang="scss" scoped>
.indBau {
  height: 22.5rem;
}
</style>
