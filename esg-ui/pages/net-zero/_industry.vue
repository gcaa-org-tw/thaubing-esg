<template lang="pug">
  .netZero
    h1 Net zero {{$route.params.industry}}
    .mw8.center.pa3.mv4 {{stats}}
</template>
<script>
export default {
  async asyncData ({ $content, params, redirect }) {
    try {
      const stats = await $content('industry', `${params.industry}-bau`).fetch()
      const allCompanyList = await $content('companyList').fetch()
      const companyList = allCompanyList.body.filter((company) => {
        return company.上市上櫃產業編碼 === params.industry
      })
      return {
        stats,
        companyList
      }
    } catch {
      redirect('/')
      return { stats: [], companyList: [] }
    }
  }
}
</script>
<style lang="scss" scoped>
.netZero {}
</style>
