<template lang="pug">
  .company
    .company__nav.pv3.no-repeat.cover
      .mw8.ph3.flex.justify-between.center
        nuxt-link.f3.fw5.white(to="/") ESG 檢測儀
        nuxt-link.white.dim(to="/about") 關於計畫
    .mw8.center.mt4.ph3
      h1.green.fw5.f3 {{company.公司名稱}}
      .green {{company.自訂產業別}} · 資本額 {{capital}}
      .company__subtitle Environment 環境保護相關數據
      .charts
        .charts__item
          gh-gas-chart(:stats="stats.body")
        .charts__item
          gh-gas-self-chart(:stats="stats.body")
        .charts__item
          power-usage-self-chart(:stats="stats.body")
        .charts__item
          re-power-self-chart(:stats="stats.body")
        .charts__item
          water-self-chart(:stats="stats.body")
        .charts__item
          waste-self-chart(:stats="stats.body")
        .charts__item.charts__item--two
          penalty-chart(:stats="stats.body")
        .charts__item.charts__item--two
          air-pollution-chart(:stats="stats.body")
      .company__subtitle Social 社會責任相關數據
      .charts
        .charts__item.charts__item--two
          salary-chart(:stats="stats.body")
        .charts__item
          crew-count-self-chart(:stats="stats.body")
        .charts__item
          crew-ratio-self-chart(:stats="stats.body")
      .company__subtitle Governance 治理相關數據
      income-chart(:stats="stats.body")
      gcaa-footer
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
  }),
  computed: {
    capital () {
      const latestCapital = this.stats.body.reduce((latest, row) => {
        if (row.項目 === '資本額' && row.年份 > latest.年份) {
          return row
        }
        return latest
      }, { 年份: '1970' })
      return Number.parseInt(latestCapital.數值).toLocaleString() || '？'
    }
  }
}
</script>
<style lang="scss" scoped>
.company {
  &__nav {
    background-image: url('~/assets/tree-bg.png');
  }
  &__subtitle {
    margin: 3.25rem 0 1rem;
    color: #373737;
  }
}
.charts {
  @include ns-screen {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.5rem;
    row-gap: 1.5rem;
  }
  &__item {
    height: 24rem;
    &--two {
      height: 26rem;
      grid-column: 1 / 3;
    }
  }
}
</style>
