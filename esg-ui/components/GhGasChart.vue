<template lang="pug">
  chart-panel(
    title="溫室氣體排放"
    :unit="['公噸CO2e', '公噸/仟元']"
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
            ['範疇一（直接排放）', '範疇二（間接排放）']
          ],
          types: {
            每單位營收排放量: 'line'
          },
          axes: {
            '範疇一（直接排放）': 'y',
            '範疇二（間接排放）': 'y',
            每單位營收排放量: 'y2'
          },
          colors: {
            每單位營收排放量: '#555'
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
            label: this.measureMap['範疇二（間接排放）'].unit,
            tick: {
              format: this.genYFormatter()
            }
          },
          y2: {
            show: true,
            label: this.measureMap.每單位營收排放量.unit,
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
