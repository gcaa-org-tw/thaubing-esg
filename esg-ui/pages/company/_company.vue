<template lang="pug">
  .company
    .mw8.center.mt4.ph3
      h1.green.fw5.f3 {{company.公司名稱}}
      .green {{company.自訂產業別}} · 資本額 {{capital}} 元
      .company__subtitle(v-if="bauStats.length")
        net-zero-single-company(:bau-stats="bauStats" :ci-stats="ciStats" :company="company")
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
        .charts__item.charts__item
          regular-air-pollution-chart(:stats="stats.body")
        .charts__item.charts__item
          harmful-air-pollution-chart(:stats="stats.body")
      .company__subtitle Social 社會責任相關數據
      .charts
        .charts__item.charts__item--two
          salary-chart(:stats="stats.body")
        .charts__item
          crew-count-self-chart(:stats="stats.body")
        .charts__item
          crew-ratio-self-chart(:stats="stats.body")
      .company__subtitle Governance 治理相關數據
      .charts.mb4
        .charts__item.charts__item--two
          income-chart(:stats="stats.body")
      gcaa-footer
</template>
<script>
import { friendlyHeader } from '~/libs/crawlerFriendly'
import { cleanupRawStats } from '~/libs/netZeroUtils'
export default {
  async asyncData ({ $content, params, redirect, store }) {
    let stats = null
    const companyList = await $content('companyList').fetch()
    const company = companyList.body.find(item => item.統編 === params.company) || {}
    const companyAbbr = company.公司簡稱
    try {
      stats = await $content('company', companyAbbr).fetch()
    } catch {
      redirect('/')
    }
    if (!stats) {
      return
    }

    let bauStats = []
    let ciStats = []
    try {
      bauStats = await $content('company', `${companyAbbr}-bau`).fetch()
      ciStats = await $content('company', `${companyAbbr}-net-zero-commitment`).fetch()
      bauStats = cleanupRawStats(bauStats)
      ciStats = cleanupRawStats(ciStats)
    } catch {
      // it's ok
    }

    // for last industry traversal
    store.commit('setCompany', company)

    return {
      stats,
      company,
      bauStats,
      ciStats
    }
  },
  head: friendlyHeader({
    title () {
      return this.company.公司簡稱
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
