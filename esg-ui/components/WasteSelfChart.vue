<template lang="pug">
  chart-panel(
    title="廢棄物管理"
    :is-self-report="true"
    :unit="['噸']"
    :c3-config="c3Config"
  )
</template>
<script>
import { environment } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(environment, '廢棄物管理', true)],
  computed: {
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.dumpSubCatStats(),
          groups: [
            ['一般事業廢棄物', '有害事業廢棄物', '資源化再利用']
          ]
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
            label: this.measureMap.一般事業廢棄物.unit,
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
