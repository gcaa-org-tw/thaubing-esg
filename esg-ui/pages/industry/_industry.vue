<template lang="pug">
  .industry.mv5.mw8.center
    h1.b.f1 {{$route.params.industry}}
    .pa3.ba.mv3
      .pv1.mb1.bb.b--moon-gray(v-for="(row, i) in stats.body" :key="i")
        nuxt-link(:to="companyUrl(row.統編)") {{companyAbbr(row.統編)}}
        span - {{row.年份}} - {{row.項目}}: {{row.數值}} {{row.單位}}
</template>
<script>
import { friendlyHeader } from '~/libs/crawlerFriendly'

export default {
  async asyncData ({ $content, params, redirect }) {
    try {
      const stats = await $content('industry', params.industry).fetch()
      const companyList = await $content('companyList').fetch()
      return {
        stats,
        companyList
      }
    } catch {
      redirect('/')
    }
  },
  head: friendlyHeader({
    title () {
      return this.$route.params.industry
    }
  }),
  methods: {
    getCompany (id) {
      return this.companyList.body.find(item => item.統編 === id) || {}
    },
    companyAbbr (id) {
      const meta = this.getCompany(id)
      return meta.公司簡稱 || ''
    },
    companyUrl (id) {
      const abbr = this.companyAbbr(id)
      if (!abbr) {
        return '#'
      }
      return `/company/${abbr}`
    }
  }
}
</script>
<style lang="scss" scoped>
.industry {}
</style>
