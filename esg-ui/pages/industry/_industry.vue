<template lang="pug">
  .industry.mv5.center
    select(v-model="industry")
      option(v-for="opt in industries" :key="opt") {{opt}}
    table.mv3.ba.b--moon-gray
      thead
        th 公司名稱
        th(v-for="column in perEsgColumns.ALL" :key="column.key") {{column.key}}
      tr.striped--light-gray(v-for="row in visibleStats" :key="row.company.統編")
        td
          nuxt-link(:to="companyUrl(row.company)") {{row.company.公司簡稱}}
        td(v-for="column in perEsgColumns.ALL" :key="column.key")
          span {{beautyValue(row, column)}}
</template>
<script>
import { friendlyHeader } from '~/libs/crawlerFriendly'
import industries from '~/assets/industries.json'

const COLUMNS = [
  { cat: 'E', subCat: '溫室氣體排放', measure: '範疇一（直接排放）' },
  { cat: 'E', subCat: '溫室氣體排放', measure: '範疇二（間接排放）' },
  { cat: 'S', subCat: '員工薪資', measure: '平均薪資' },
  { cat: 'S', subCat: '員工薪資', measure: '薪資中位數' },
  { cat: 'G', subCat: '', measure: '資本額' },
  { cat: 'G', subCat: '收入、成本與淨利', measure: '營業收入' },
  { cat: 'G', subCat: '收入、成本與淨利', measure: '營業成本' },
  { cat: 'G', subCat: '收入、成本與淨利', measure: '營業費用' },
  { cat: 'G', subCat: '收入、成本與淨利', measure: '淨利' }
]

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
  data () {
    return {
      industry: this.$route.params.industry,
      order: '溫室氣體排放-範疇一（直接排放）',
      isAsc: false
    }
  },
  head: friendlyHeader({
    title () {
      return this.$route.params.industry
    }
  }),
  computed: {
    year () {
      return this.$route.query.year || '2019'
    },
    industries () {
      return industries
    },
    perEsgColumns () {
      const columnMap = { E: [], S: [], G: [] }
      COLUMNS.forEach((column) => {
        columnMap[column.cat].push({
          key: `${column.subCat}-${column.measure}`,
          meta: column
        })
      })
      return {
        ...columnMap,
        ALL: [...columnMap.E, ...columnMap.S, ...columnMap.G]
      }
    },
    companyStats () {
      const companyMap = this.companyList.body.reduce((map, company) => {
        if (company.自訂產業別 !== this.$route.params.industry) {
          return map
        }
        map[company.統編] = {
          company,
          stats: {}
        }
        return map
      }, {})
      this.stats.body.forEach((stat) => {
        const company = companyMap[stat.統編]
        if (!company || stat.年份 !== this.year) {
          return
        }
        stat.value = Number.parseFloat(stat.數值)
        company.stats[`${stat.子分類}-${stat.項目}`] = stat
      })
      return Object.values(companyMap)
    },
    visibleStats () {
      return [...this.companyStats].sort((a, b) => {
        if (this.isAsc) {
          return a.stats[this.order] - b.stats[this.order]
        }
        return b.stats[this.order] - a.stats[this.order]
      })
    }
  },
  watch: {
    industry () {
      this.$router.push(`/industry/${this.industry}`)
    }
  },
  methods: {
    companyUrl (company) {
      return `/company/${company.公司簡稱}`
    },
    beautyValue (row, column) {
      if (!(column.key in row.stats)) {
        return '-'
      }
      const field = row.stats[column.key]
      if (!isNaN(field.value)) {
        const value = Math.round(field.value * 100) / 100
        return `${value.toLocaleString()} (${field.單位})`
      }
      return `${field.數值} (${field.單位})`
    }
  }
}
</script>
<style lang="scss" scoped>
.industry {
  max-width: calc(100vw - 10rem);
}
</style>
