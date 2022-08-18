<template lang="pug">
  .overviewBau.relative
    .netZeroChart.h-100(ref="chart")
</template>
<script>
import { get } from 'lodash'
import { genC3Config, genNetZeroCompanyChartData, genTooltip } from '~/libs/netZeroUtils'

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
      return genNetZeroCompanyChartData({
        stats: this.bauStats,
        getUnitLabel: (row) => {
          return this.industryMap[row.產業別].label
        },
        getUnitColor: (industryName) => {
          return get(this.industryNameMap, `${industryName}.color`, '')
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
            findUnit: (industryName) => {
              return this.industryNameMap[industryName]
            },
            findAnotherRow: () => {
              return null
            }
          })
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
    }
  }
}
</script>
<style lang="scss" scoped>
.overviewBau {
  height: 22.5rem;
}
</style>
