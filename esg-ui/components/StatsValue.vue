<template lang="pug">
  component.statsValue(
    :is="widget"
    :class="{'light-silver': columnMeta.isFake}"
    :quartile="quartile"
    :row="row"
    :column-meta="columnMeta"
  )
    | {{beautyValue}}
</template>
<script>
import QuartileCell from './QuartileCell'
import { MAJOR_MEASURE_LIST } from '~/assets/defs'

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
      const majorMeasureList = MAJOR_MEASURE_LIST.E
      if (this.columnMeta.isSelfReport && majorMeasureList.includes(this.columnMeta.measure)) {
        return QuartileCell
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
      if (!Number.isNaN(field.value)) {
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
