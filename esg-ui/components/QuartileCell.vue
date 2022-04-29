<template lang="pug">
  .qua
    .qua__val.flex.items-center.justify-end.ml-auto.br2(
      :class="barClass"
      :style="barStyle"
    )
      slot
</template>
<script>
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
    measureQuartile () {
      return this.quartile.E[this.columnMeta.measure]
    },
    value () {
      if (!(this.columnMeta.key in this.row.stats)) {
        return undefined
      }
      const field = this.row.stats[this.columnMeta.key]
      return field.value
    },
    barClass () {
      const value = this.value
      let suffix = ''
      if (Number.isNaN(value) || value === undefined) {
        suffix = 'unknown'
      } else if (value >= this.measureQuartile.thirdForth) {
        suffix = 'red'
      } else if (value >= this.measureQuartile.oneForth) {
        suffix = 'yellow'
      } else {
        suffix = 'green'
      }
      return [`qua__val--${suffix}`]
    },
    barStyle () {
      const value = this.value
      if (Number.isNaN(value) || value === undefined) {
        return { width: '30%' }
      }
      return {
        width: `${value * 100 / this.measureQuartile.max}%`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.qua {
  &__val {
    background: $unknown;
    color: black;
    width: 14rem;
    &--red {
      background: $red;
      color: white;
    }
    &--green {
      background: $green;
    }
    &--yellow {
      background: $yellow;
    }
  }
}
</style>
