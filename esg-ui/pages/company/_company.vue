<template lang="pug">
  .company.mv5.mw8.center
    h1.b.f1 {{$route.params.company}} ({{company.公司名稱}})
    .pa3.ba.mv3
      .pv1.mb1.bb.b--moon-gray(v-for="(row, i) in stats.body" :key="i")
        | {{row.年份}} - {{row.項目}}: {{row.數值}} {{row.單位}}
</template>
<script>
import { friendlyHeader } from '~/libs/crawlerFriendly'
export default {
  async asyncData ({ $content, params, redirect }) {
    let stats, companyList
    try {
      stats = await $content('company', params.company).fetch()
      companyList = await $content('companyList').fetch()
    } catch {
      redirect('/')
    }
    if (!stats) {
      return
    }
    const company = companyList.body.find(item => item.公司簡稱 === params.company)
    return {
      stats,
      company
    }
  },
  head: friendlyHeader({
    title () {
      return this.$route.params.company
    }
  })
}
</script>
