<template lang="pug">
  chart-panel(
    title="空氣污染物"
    :c3-config="c3Config"
  )
</template>
<script>
import { environment } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(environment, '空氣污染物申報')],
  computed: {
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.dumpSubCatStats()
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
