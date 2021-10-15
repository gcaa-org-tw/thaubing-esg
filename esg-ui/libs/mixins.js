import { format } from 'd3'

export function chartMixin (esgColumns, measureFilter) {
  if (typeof measureFilter === 'string') {
    // filter by subCat
    const subCat = measureFilter
    measureFilter = function (row) {
      return row.subCat === subCat
    }
  }
  return {
    props: {
      stats: {
        type: Array,
        required: true
      }
    },
    computed: {
      measureMap () {
        const list = esgColumns.filter(measureFilter)
        return list.reduce((map, row) => {
          map[row.measure] = row
          return map
        }, {})
      }
    },
    methods: {
      genYFormatter (isDollarFormat = false) {
        const formatter = isDollarFormat ? '$,d' : ',d'
        return format(formatter)
      },
      dumpSubCatStats () {
        const ret = { x: ['x'] }
        const measureList = Object.keys(this.measureMap)

        measureList.forEach((measure) => {
          ret[measure] = [measure]
        })

        const annualStats = {}
        this.stats.forEach((row) => {
          if (!(row.項目 in this.measureMap)) {
            return
          }
          const year = row.年份
          if (!annualStats[year]) {
            annualStats[year] = {}
          }
          annualStats[year][row.項目] = Number.parseFloat(row.數值)
        })

        Object.keys(annualStats).sort().forEach((year) => {
          ret.x.push(new Date(`${year}-01-01`))
          const perYear = annualStats[year]
          measureList.forEach((measure) => {
            ret[measure].push(perYear[measure] || null)
          })
        })

        return Object.values(ret)
      }
    }
  }
}
