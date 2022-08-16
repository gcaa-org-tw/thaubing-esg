<template lang="pug">
  .esgLegend.flex.items-center(:class="[`esgLegend--${type}`]")
    .esgLegend__label.flex-none(:style="{ background: color }")
    .esgLegend__name.flex-auto.truncate {{title}}
    .esgLegend__value.flex-none(v-if="value >= 0" :class="valueClass") {{valueLabel}}
</template>
<script>
import { yValueFormatter } from './utils'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    /**
     * 0 ~ 100
     */
    value: {
      type: Number,
      default: -1
    },
    color: {
      type: String,
      default: '#000'
    },
    type: {
      type: String,
      default: 'bau',
      validator (val) {
        return ['bau', 'ci', 'roadmap'].includes(val)
      }
    }
  },
  computed: {
    valueDiff () {
      return this.value - 100
    },
    valueLabel () {
      if (this.valueDiff !== 0) {
        return yValueFormatter(Math.abs(this.valueDiff))
      }
      return ' 0'
    },
    valueClass () {
      if (this.valueDiff > 0) {
        return 'esgLegend__value--raise'
      } else if (this.valueDiff < 0) {
        return 'esgLegend__value--reduce'
      }
      return ''
    }
  }
}
</script>
