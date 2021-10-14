<template lang="pug">
  chart-panel(
    title="員工薪資"
    :unit="'仟元'"
    :c3-config="c3Config"
  )
</template>
<script>
import { social } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(social, '員工薪資')],
  computed: {
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.dumpSubCatStats(),
          type: 'line'
        },
        ppoint: {
          r: 6
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y'
            }
          },
          y: {
            label: this.measureMap.平均薪資.unit,
            tick: {
              format: this.genYFormatter(true)
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chartPanel {
  ::v-deep {
  }
}
</style>
