<template lang="pug">
  chart-panel(
    title="營運狀況"
    unit="仟元"
    :c3-config="c3Config"
  )
</template>
<script>
import { governance } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(governance, '營運狀況')],
  computed: {
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.dumpSubCatStats(),
          type: 'bar',
          groups: [
            ['營業成本', '營業費用']
          ],
          types: {
            淨利: 'line'
          },
          axes: {
            營業成本: 'y',
            營業費用: 'y',
            營業收入: 'y',
            淨利: 'y2'
          },
          colors: {
            碳密集度: '#555'
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
            label: this.measureMap.營業收入.unit,
            tick: {
              format: this.genYFormatter(true)
            }
          },
          y2: {
            show: true,
            label: this.measureMap.淨利.unit,
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
    .c3-chart-line .c3-line {
      stroke-width: 3px;
    }
  }
}
</style>
