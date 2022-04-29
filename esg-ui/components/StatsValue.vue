<template lang="pug">
  component.statsValue(:is="widget" :class="{'light-silver': columnMeta.isFake}")
    | {{beautyValue}}
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
    }
  },
  computed: {
    widget () {
      return 'span'
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
