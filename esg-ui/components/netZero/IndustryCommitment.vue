<template lang="pug">
  .indCom.relative
    .netZeroChart.h-100(ref="chart")
</template>
<script>
import { get } from 'lodash'
import { genC3Config, companyMixin, genNetZeroCompanyChartData, genTooltip } from '~/libs/netZeroUtils'

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
        tooltip: {
          grouped: false,
          contents: genTooltip({
            isBau: false,
            findUnit: (companyAbbr) => {
              return this.companyAbbrMap[companyAbbr]
            },
            findAnotherRow: (year, company) => {
              return this.bauStats.find((row) => {
                return row.年份 === year && row.統編 === company.統編
              })
            }
          })
        }
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
    }
  }
}
</script>
<style lang="scss" scoped>
.indCom {
  height: 22.5rem;
}
</style>
