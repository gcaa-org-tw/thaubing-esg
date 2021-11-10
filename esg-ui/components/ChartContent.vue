<template lang="pug">
  .chartContent.relative
    .chartContent__chart.h-100(ref="chart" :class="{'chartContent__chart--blur': hasNoData}")
    .chartContent__noData.aspect-ratio--object.flex.items-center.justify-center(v-if="hasNoData")
      .f3.fw5.gray.pb4 無資料
</template>
<script>
export default {
  props: {
    config: {
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
    hasNoData () {
      if (!this.config.data) {
        return false
      }
      const columns = this.config.data.columns.filter((column) => {
        return column.length > 1 && column[0] !== this.config.data.x
      })
      return columns.every((column) => {
        return column.slice(1).every(value => value === null)
      })
    }
  },
  mounted () {
    if (this.config.data) {
      const c3 = require('c3')
      this.c3Handler = c3.generate({
        ...this.config,
        bindto: this.$refs.chart
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.chartContent {
  &__chart {
    &--blur {
      filter: blur(3px);
    }
  }
  &__noData {
    background: #ffffff80;
  }
}
</style>
