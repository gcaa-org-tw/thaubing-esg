<template lang="pug">
  .indCom.relative
    .netZeroChart.h-100(:class="{'netZeroChart--blur': hasNoData}" ref="chart")
    .indCom__noData.aspect-ratio--object.flex.items-center.justify-center(v-if="hasNoData")
      .f3.fw5.gray.pb4 尚無目標
</template>
<script>
import { get, uniq } from 'lodash'
import { genC3Config, companyMixin, genNetZeroCompanyChartData, genTooltip, focusUnit, PREDICT_SUFFIX } from '~/libs/netZeroUtils'

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
    hasNoData () {
      return !this.ciStatsWithoutPrediction.length
    },
    ciStatsWithoutPrediction () {
      return this.ciStats.filter(row => !row.是推估值)
    },
    chartData () {
      let allUnits = uniq(this.ciStatsWithoutPrediction.map(row => row.統編))

      allUnits = [
        ...allUnits.map(id => this.companyMap[id].公司簡稱),
        'IPCC',
        'PNNL'
      ]
      return genNetZeroCompanyChartData({
        stats: this.ciStatsWithoutPrediction,
        getUnitLabel: (row) => {
          return this.companyMap[row.統編].公司簡稱
        },
        getUnitColor: (companyAbbr) => {
          return get(this.companyAbbrMap, `${companyAbbr}.color`, '#000')
        },
        isDashed (row) {
          return true
        },
        allUnits,
        handleClick: (d, element) => {
          let label = d.id
          if (label.endsWith(PREDICT_SUFFIX)) {
            label = label.slice(0, PREDICT_SUFFIX.length * -1)
          }
          this.$emit('open-company', label)
        }
      })
    },
    c3Config () {
      return genC3Config(this.yMax, {
        line: { connectNull: true },
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
.indCom {
  height: 22.5rem;
}
</style>
