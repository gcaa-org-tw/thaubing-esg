<template lang="pug">
  chart-panel(
    title="員工組成"
    :is-self-report="true"
    :unit="['人']"
    :c3-config="c3Config"
  )
</template>
<script>
import { social } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(social, (column) => {
    return column.subCat === '員工組成' && (column.measure === '正式員工' || column.measure.startsWith('是否'))
  })],
  computed: {
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.dumpSubCatStats(),
          type: 'bar',
          types: {
            正式員工: 'line'
          },
          axes: {
            正式員工: 'y',
            是否聘用移工: 'y2',
            是否聘用身障人士: 'y2',
            是否聘用原住民: 'y2'
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
            label: this.measureMap.正式員工.unit,
            tick: {
              format: this.genYFormatter()
            }
          },
          y2: {
            show: true,
            label: this.measureMap.是否聘用移工.unit,
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
  ::v-deep() {
    .c3-chart-line .c3-line {
      stroke-width: 3px;
    }
  }
}
</style>
