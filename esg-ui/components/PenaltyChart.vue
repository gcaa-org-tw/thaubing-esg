<template lang="pug">
  chart-panel(
    title="違反環境法規"
    :unit="['金額', '次數']"
    :c3-config="c3Config"
  )
</template>
<script>
import { environment } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(environment, '環境違規')],
  computed: {
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.dumpSubCatStats(),
          type: 'bar',
          types: {
            違反環境法規次數: 'line'
          },
          axes: {
            違反環境法規金額: 'y',
            違反環境法規次數: 'y2'
          },
          colors: {
            違反環境法規次數: '#555'
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
            label: this.measureMap.違反環境法規金額.unit,
            tick: {
              format: this.genYFormatter()
            }
          },
          y2: {
            show: true,
            label: this.measureMap.違反環境法規次數.unit,
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
