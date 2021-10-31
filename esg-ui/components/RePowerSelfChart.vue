<template lang="pug">
  chart-panel(
    title="再生能源"
    :is-self-report="true"
    :unit="['KW', '度']"
    :c3-config="c3Config"
  )
</template>
<script>
import { environment } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(environment, (column) => {
    return column.subCat === '能源使用狀況' && ['再生能源設置量', '再生能源發電量'].includes(column.measure)
  })],
  computed: {
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.dumpSubCatStats(),
          type: 'bar',
          types: {
            再生能源設置量: 'line'
          },
          axes: {
            再生能源發電量: 'y',
            再生能源設置量: 'y2'
          },
          colors: {
            再生能源設置量: '#555'
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
            label: this.measureMap.再生能源發電量.unit,
            tick: {
              format: this.genYFormatter()
            }
          },
          y2: {
            show: true,
            label: this.measureMap.再生能源設置量.unit,
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
