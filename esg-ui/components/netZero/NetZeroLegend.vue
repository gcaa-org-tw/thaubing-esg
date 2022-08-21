<template lang="pug">
  .esgLegend.flex.items-center(:class="[`esgLegend--${type}`]")
    .esgLegend__label.flex-none(:style="{ background: color }")
    .esgLegend__name.flex-auto.flex.items-center
      .truncate {{title}}
      .ml1
        b-tooltip(
          v-if="tip"
          :label="tip"
          type="is-dark"
          multilined
          position="is-right"
        )
          i.black.fas.fa-question-circle
    .esgLegend__value.flex-none(v-if="value >= 0" :class="valueClass") {{valueLabel}}
</template>
<script>
import { yValueFormatter } from '~/libs/netZeroUtils'

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
      default: 'fact',
      validator (val) {
        return ['bau', 'fact', 'noLabel', 'roadmap'].includes(val)
      }
    },
    tip: {
      type: String,
      default: ''
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
<style lang="scss" scoped>
.esgLegend {
  &__name {
    .b-tooltip.is-multiline.is-medium {
      ::v-deep(.tooltip-content) {
        width: 20rem;
        line-height: 1.5;
        text-align: left;
      }
    }
  }
}
</style>
