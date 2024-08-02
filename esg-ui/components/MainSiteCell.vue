<template lang="pug">
  a.mainSite.flex.items-center(:href="link" target="_blank" rel="noopener")
    | {{value}}
    i.fas.fa-external-link-alt.f7.ml2
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    row: {
      type: Object,
      required: true
    },
    columnMeta: {
      type: Object,
      required: true
    },
    quartile: {
      type: Object,
      required: true
    }
  },
  computed: {
    link () {
      const id = this.row.company.統編
      return `https://thaubing.gcaa.org.tw/corp/${id}`
    }
  }
}
</script>
<style lang="scss" scoped>
.mainSite {
  color: #4a4a4a;
  text-decoration: underline;
}
</style>
