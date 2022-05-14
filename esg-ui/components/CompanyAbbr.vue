<template lang="pug">
  nuxt-link.comAbbr.fw5.dim(:to="companyUrl") {{company.公司簡稱}}
</template>
<script>
export default {
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  computed: {
    companyUrl () {
      return `/company/${this.company.統編}/`
    }
  }
}
</script>
<style lang="scss" scoped>
.comAbbr {
  color: $green-primary;
  text-decoration: underline;
}
</style>
