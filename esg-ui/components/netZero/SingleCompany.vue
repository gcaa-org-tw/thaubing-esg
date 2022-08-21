<template lang="pug">
  chart-panel(title="淨零路徑")
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
import { genC3Config, companyMixin, genNetZeroCompanyChartData, genTooltip, Y_MAX } from '~/libs/netZeroUtils'

const META = {
  BAU: {
    LABEL: 'BAU',
    COLOR: interpolateCividis(0)
  },
  CI: {
    LABEL: 'CI',
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
      const richCiStats = this.ciStats.map((row) => {
        return {
          ...row,
          label: META.CI.LABEL,
          isPredicted: !!row.是承諾值
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
        isDashed (row) {
          return !!row.isPredicted
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
      const label = data[0].id
      if (label === 'IPCC' || label === 'PNNL') {
        return ''
      }
      const isBau = label.startsWith(META.BAU.LABEL)
      const needle = isBau ? META.BAU.LABEL : META.CI.LABEL
      const mockId = label.replace(needle, this.company.公司簡稱)
      const mockData = [{
        ...data[0],
        id: mockId
      }]
      if (isBau) {
        return this.genBauTooltip(mockData)
      }
      return this.genCiTooltip(mockData)
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
