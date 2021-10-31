<template lang="pug">
  chart-panel(
    title="年度總用電量"
    :is-self-report="true"
    :unit="['度', '度/億元']"
    :c3-config="c3Config"
  )
</template>
<script>
import { environment } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(environment, (column) => {
    return column.subCat === '能源使用狀況' && ['總用電量', '能源密集度'].includes(column.measure)
  })],
  computed: {
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.dumpSubCatStats(),
          type: 'bar',
          types: {
            能源密集度: 'line'
          },
          axes: {
            總用電量: 'y',
            能源密集度: 'y2'
          },
          colors: {
            能源密集度: '#555'
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
            label: this.measureMap.總用電量.unit,
            tick: {
              format: this.genYFormatter()
            }
          },
          y2: {
            show: true,
            label: this.measureMap.能源密集度.unit,
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
