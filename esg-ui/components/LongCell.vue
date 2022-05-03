<template lang="pug">
  .longCell(:title="title" @click="showAllValue" :class="{'longCell--long': isTooLong}")
    | {{label}}
</template>
<script>
const MAX_LEN = 8
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    isTooLong () {
      return this.value.length > MAX_LEN
    },
    label () {
      if (this.isTooLong) {
        return this.value.slice(0, MAX_LEN) + '...'
      }
      return this.value
    },
    title () {
      if (this.isTooLong) {
        return this.value
      }
      return ''
    }
  },
  methods: {
    showAllValue () {
      if (!this.isTooLong) {
        return
      }
      window.alert(this.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.longCell {
  &--long {
    text-decoration: underline dashed;
    cursor: pointer;
  }
}
</style>
