<template lang="pug">
  chart-panel(
    title="員工組成"
    :is-self-report="true"
    :unit="['男/女', '人/正式員工']"
    :c3-config="c3Config"
  )
</template>
<script>
import { format } from 'd3'
import { social } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(social, (column) => {
    return column.subCat === '員工組成' && ['性別比', '新進率', '離職率'].includes(column.measure)
  })],
  computed: {
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.dumpSubCatStats(),
          axes: {
            性別比: 'y',
            新進率: 'y2',
            離職率: 'y2'
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
            label: this.measureMap.性別比.unit
          },
          y2: {
            show: true,
            label: this.measureMap.新進率.unit,
            tick: {
              format: format('.02%')
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
