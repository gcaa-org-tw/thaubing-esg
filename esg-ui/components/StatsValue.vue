<template lang="pug">
  component.statsValue(
    :is="widget"
    :class="{'light-silver': columnMeta.isFake}"
    :quartile="quartile"
    :row="row"
    :column-meta="columnMeta"
    :value="beautyValue"
  )
    | {{beautyValue}}
</template>
<script>
// import QuartileCell from './QuartileCell'
import LongCell from './LongCell'
// import { MAJOR_MEASURE_LIST } from '~/assets/defs'

const PURE_TEXT_COLUMNS = new Set(['工安意外', '溫室氣體減量目標說明', '溫室氣體減量承諾'])

export default {
  props: {
    columnMeta: {
      type: Object,
      required: true
    },
    row: {
      type: Object,
      required: true
    },
    quartile: {
      type: Object,
      required: true
    }
  },
  computed: {
    widget () {
      // #125, hide quartile-cell for now
      // const majorMeasureList = MAJOR_MEASURE_LIST.E
      // if (this.columnMeta.isSelfReport && majorMeasureList.includes(this.columnMeta.measure)) {
      //   return QuartileCell
      // } else
      if (PURE_TEXT_COLUMNS.has(this.columnMeta.measure)) {
        return LongCell
      } else {
        return 'span'
      }
    },
    beautyValue () {
      if (this.columnMeta.isFake) {
        return '待解鎖'
      }
      if (!(this.columnMeta.key in this.row.stats)) {
        return '-'
      }
      const field = this.row.stats[this.columnMeta.key]
      if (!PURE_TEXT_COLUMNS.has(this.columnMeta.measure) && !Number.isNaN(field.value)) {
        const toFixed = 10 ** (this.columnMeta.toFixed || 0)
        const value = Math.round(field.value * toFixed) / toFixed
        return value.toLocaleString()
      }
      return `${field.數值}`
    }
  }
}
</script>
<style lang="scss" scoped>
.statsValue {}
</style>
