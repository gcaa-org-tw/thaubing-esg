<template lang="pug">
  chart-panel(
    title="違反環境法規"
    :unit="['金額']"
    :c3-config="c3Config"
  )
</template>
<script>
import { environment } from '~/assets/esgColumns'
import { chartMixin } from '~/libs/mixins'

export default {
  mixins: [chartMixin(environment, (column) => {
    return column.subCat === '環境違規' && column.onlyDetail
  })],
  computed: {
    c3Config () {
      const columns = this.dumpSubCatStats()
      const columnMap = {
        '違反環境法規金額-空氣': '因空氣污染遭裁罰金額',
        '違反環境法規金額-水': '因水污染遭裁罰金額',
        '違反環境法規金額-misc': '其他違規項目金額'
      }
      columns.forEach((column) => {
        if (columnMap[column[0]]) {
          column[0] = columnMap[column[0]]
        }
      })
      return {
        data: {
          x: 'x',
          columns,
          type: 'bar',
          groups: [Object.values(columnMap)]
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y'
            }
          },
          y: {
            label: this.measureMap['違反環境法規金額-空氣'].unit,
            tick: {
              format: this.genYFormatter()
            }
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
