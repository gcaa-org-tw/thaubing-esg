<template lang="pug">
  chart-panel(
    title="有害空氣污染物"
    :unit="['公噸', '公斤']"
    :c3-config="c3Config"
  )
</template>
<script>
import { environment } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(environment, (column) => {
    return column.subCat.startsWith('空氣污染物申報-有害空氣污染物')
  })],
  computed: {
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.dumpSubCatStats(),
          axes: {
            戴奧辛: 'y2'
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y'
            }
          },
          y: {
            tick: {
              label: '公噸',
              format: this.genYFormatter()
            }
          },
          y2: {
            show: true,
            label: '戴奧辛（公斤）',
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
</style>
