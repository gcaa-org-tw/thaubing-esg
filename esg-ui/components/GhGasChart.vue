<template lang="pug">
  chart-panel(
    title="溫室氣體排放"
    :unit="['公噸CO2e', '公噸/億元']"
    :c3-config="c3Config"
  )
</template>
<script>
import { environment } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(environment, '溫室氣體排放')],
  computed: {
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.dumpSubCatStats(),
          type: 'bar',
          groups: [
            ['範疇一直接排放', '範疇二間接排放']
          ],
          // types: {
          //   碳密集度: 'line'
          // },
          axes: {
            範疇一直接排放: 'y',
            範疇二間接排放: 'y',
            碳密集度: 'y2'
          // },
          // colors: {
          //   碳密集度: '#555'
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
            label: this.measureMap.範疇二間接排放.unit,
            tick: {
              format: this.genYFormatter()
            }
          // },
          // y2: {
          //   show: true,
          //   label: this.measureMap.碳密集度.unit,
          //   tick: {
          //     format: this.genYFormatter()
          //   }
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chartPanel {
  ::v-deep() {
    .c3-chart-line .c3-line {
      stroke-width: 3px;
    }
  }
}
</style>
