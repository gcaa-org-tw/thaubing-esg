<template lang="pug">
  .chartContent(ref="chart")
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      c3Handler: null
    }
  },
  mounted () {
    if (this.config.data) {
      const c3 = require('c3')
      this.c3Handler = c3.generate({
        ...this.config,
        bindto: this.$refs.chart
      })
    }
  }
}
</script>
