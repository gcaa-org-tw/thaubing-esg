<template lang="pug">
  chart-panel(
    title="水資源"
    :is-self-report="true"
    :unit="['噸']"
    :c3-config="c3Config"
  )
</template>
<script>
import { environment } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(environment, '水資源', true)],
  computed: {
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.dumpSubCatStats(),
          axes: {
            回收水量: 'y',
            耗用水量: 'y',
            排放水量: 'y',
            總取水量: 'y2'
          },
          colors: {
            總取水量: '#555'
          }
        },
        point: {
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
            label: this.measureMap.耗用水量.unit,
            tick: {
              format: this.genYFormatter()
            }
          },
          y2: {
            show: true,
            label: this.measureMap.總取水量.unit,
            tick: {
              format: this.genYFormatter()
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
    .c3-chart-line .c3-line {
      stroke-width: 3px;
    }
  }
}
</style>
