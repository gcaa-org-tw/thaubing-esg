<template lang="pug">
  chart-panel(
    title="溫室氣體排放"
    :unit="['公噸CO2e', '公噸/仟元']"
    :c3-config="c3Config"
  )
</template>
<script>
import { environment } from '~/assets/esgColumns'

export default {
  props: {
    stats: {
      type: Array,
      required: true
    }
  },
  computed: {
    measureMap () {
      const list = environment
        .filter(row => row.subCat === '溫室氣體排放')
      return list.reduce((map, row) => {
        map[row.measure] = row
        return map
      }, {})
    },
    c3Data () {
      const ret = { x: ['x'] }
      const measureList = Object.keys(this.measureMap)

      measureList.forEach((measure) => {
        ret[measure] = [measure]
      })

      const annualStats = {}
      this.stats.forEach((row) => {
        if (row.子分類 !== '溫室氣體排放') {
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
    },
    c3Config () {
      return {
        data: {
          x: 'x',
          columns: this.c3Data,
          type: 'bar',
          groups: [
            ['範疇一（直接排放）', '範疇二（間接排放）']
          ],
          types: {
            每單位營收排放量: 'line'
          },
          axes: {
            '範疇一（直接排放）': 'y',
            '範疇二（間接排放）': 'y',
            每單位營收排放量: 'y2'
          },
          colors: {
            每單位營收排放量: '#555'
          }
        },
        point: {
          r: 6
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y'
            }
          },
          y: {
            label: this.measureMap['範疇二（間接排放）'].unit
          },
          y2: {
            show: true,
            label: this.measureMap.每單位營收排放量.unit
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chartPanel {
  ::v-deep {
    .c3-chart-line .c3-line {
      stroke-width: 3px;
    }
  }
}
</style>
