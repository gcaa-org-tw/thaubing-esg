<template lang="pug">
  .invTellerWrapper
    .invTeller(:style="invStyle" v-if="fundList.length")
      .invTeller__measureHead
        button.invTeller__switch.bg-transparent.w-100-ns.f3.fw6.mb2.pointer.db.pa0.tl(
          v-for="measure in orderOptions"
          @click="switchOrder"
          :class="[measure === orderBy ? 'o-100' : 'o-50']"
        ) {{measure}}
      .invTeller__fundHead.black(v-for="fund in fundList")
        .fw6 {{fund.cat}}
        .fw4(v-for="line in fundName(fund)") {{line}}
      template(v-for="stat in sortedStats")
        .invTeller__stat.bg-white.br2.br--left
          .invTeller__statVal.br2.h-100.ml-auto.fw6.pr1.flex.items-center.justify-end(:class="barClass(stat)" :style="barStyle(stat)") {{printValue(stat)}}
        .invTeller__company.bg-white.flex.items-center
          company-abbr(:company="stat.company")
        .invTeller__fundFlag.bg-white.flex.items-center(v-for="fund in fundList")
          .invTeller__flag(v-if="stat.X[fund.name]" :class="flagClass(stat)") T
      .invTeller__unit.tr {{unit}}
</template>
<script>
import { environment } from '~/assets/esgColumns'
const TARGET_MEASURES = ['碳密集度', '能源密集度']

export default {
  props: {
    stats: {
      type: Array,
      required: true
    },
    companyMap: {
      type: Object,
      required: true
    },
    year: {
      type: String,
      default: '2019'
    }
  },
  data () {
    return {
      orderBy: TARGET_MEASURES[0]
    }
  },
  computed: {
    unit () {
      return environment.find(column => column.measure === this.orderBy).unit
    },
    invStyle () {
      return {
        gridTemplateColumns: `min(10rem, 25vw) 4rem repeat(${this.fundList.length}, 1fr)`
      }
    },
    curMaxStatVal () {
      return this.sortedStats[0].E[this.orderBy]
    },
    orderOptions () {
      return TARGET_MEASURES
    },
    fundList () {
      const list = [...new Set(
        this.investmentDataPerCompany.map(row => Object.keys(row.X)).flat()
      )]
      return list.map((fund) => {
        if (fund.startsWith('中國信託')) {
          return {
            cat: '中國信託',
            name: fund
          }
        }
        return {
          cat: fund.slice(0, 2),
          name: fund
        }
      })
    },
    investmentDataPerCompany () {
      const companyMap = this.stats.reduce((ret, row) => {
        const id = row.統編
        const company = this.companyMap[id]
        if (row.年份 !== this.year || !company) {
          return ret
        }
        if (row.分類 === 'X' || (row.來自公司報告 && TARGET_MEASURES.includes(row.項目))) {
          if (!ret[id]) {
            ret[id] = { X: {}, E: {}, company }
          }
          let value = row.數值
          if (row.分類 === 'E') {
            value = Number.parseFloat(value)
          }
          ret[id][row.分類][row.項目] = value
        }
        return ret
      }, {})

      const quartileMap = TARGET_MEASURES.reduce((map, measure) => {
        map[measure] = this.findQuartileValue(companyMap, measure)
        return map
      }, {})

      return Object.values(companyMap).map((row) => {
        row.color = {}
        TARGET_MEASURES.forEach((measure) => {
          const value = row.E[measure]
          if (Number.isNaN(value) || value === undefined) {
            row.E[measure] = 0
            row.color[measure] = 'unknown'
          } else if (value >= quartileMap[measure].thridForth) {
            row.color[measure] = 'red'
          } else if (value >= quartileMap[measure].oneForth) {
            row.color[measure] = 'yellow'
          } else {
            row.color[measure] = 'green'
          }
        })
        return row
      })
    },
    sortedStats () {
      const measure = this.orderBy
      return [...this.investmentDataPerCompany].sort((a, b) => {
        return b.E[measure] - a.E[measure]
      })
    }
  },
  methods: {
    printValue (stat) {
      if (stat.color[this.orderBy] === 'unknown') {
        return '未揭露'
      }
      const value = Math.round(stat.E[this.orderBy] * 100) / 100
      return value.toLocaleString()
    },
    switchOrder () {
      this.orderBy = TARGET_MEASURES.find(haystack => haystack !== this.orderBy)
    },
    fundName (fund) {
      const len = Math.round(fund.name.length / 2)
      return [
        fund.name.slice(0, len),
        fund.name.slice(len)
      ]
    },
    barClass (stat) {
      return [`invTeller__statVal--${stat.color[this.orderBy]}`]
    },
    barStyle (stat) {
      if (stat.color[this.orderBy] === 'unknown') {
        return {
          width: '6.5rem'
        }
      }
      return {
        width: `${stat.E[this.orderBy] * 100 / this.curMaxStatVal}%`
      }
    },
    flagClass (stat) {
      return [`invTeller__flag--${stat.color[this.orderBy]}`]
    },
    findQuartileValue (companyMap, measure) {
      const sortedValues = Object.values(companyMap)
        .filter((row) => {
          return !Number.isNaN(row.E[measure])
        })
        .map(row => row.E[measure])
        .sort((a, b) => a - b)

      const len = sortedValues.length
      const ret = {
        oneForth: 0,
        thridForth: 0
      }
      if (len === 1) {
        return {
          oneForth: sortedValues[0],
          thridForth: sortedValues[0]
        }
      } else {
        const oneForthLen = Math.round(len / 4)
        ret.oneForth = (sortedValues[oneForthLen - 1] + sortedValues[oneForthLen]) / 2
        ret.thridForth = (sortedValues[len - oneForthLen] + sortedValues[len - oneForthLen - 1]) / 2
      }
      return ret
    }
  }
}
</script>
<style lang="scss" scoped>
$red: #E24243;
$yellow: #FACB3D;
$green: #6FAC45;
$unknown: #c1c1c1;

.invTellerWrapper {
  width: 100%;
  max-height: 50vh;
  overflow: auto;
  @include ns-screen {
    max-height: none;
  }
}

.invTeller {
  display: grid;
  row-gap: 0.375rem;
  max-width: 80rem;
  min-width: 48rem;
  position: relative;

  &__measureHead {
    grid-column: 1 / span 2;
    padding: 0.375rem 0.625rem;
    position: sticky;
    left: 0;
    top: 0;
    z-index: 1;
    background: #EBEDEB;
    // background: linear-gradient(90deg, rgba(235,237,235,1) 0%, rgba(235,237,235,1) 60%, rgba(255,255,255,0.26) 75%, #ffffff00 90%);
  }
  &__fundHead {
    padding: 0.375rem 0.625rem;
    position: sticky;
    top: 0;
    background: #EBEDEB;
  }

  &__stat {
    background: white;
    height: 2rem;
    position: sticky;
    left: 0;
  }
  &__unit {
    position: sticky;
    left: 0;
  }
  &__statVal {
    background: $unknown;
    color: black;
    &--red {
      background: $red;
      color: white;
    }
    &--green {
      background: $green;
    }
    &--yellow {
      background: $yellow;
    }
  }
  &__company {
    padding: 0 0.5rem;
    position: sticky;
    left: min(10rem, 25vw);
  }
  &__fundFlag {
    padding: 0 0.625rem;
    &:last-child {
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
  }
  &__flag {
    color: $unknown;
    background: $unknown;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 100%;
    &--red {
      color: $red;
      background: $red;
    }
    &--yellow {
      color: $yellow;
      background: $yellow;
    }
    &--green {
      color: $green;
      background: $green;
    }
  }
  &__switch {
    line-height: 1.5;
    color: #35811C;
    border: none;
  }
}
</style>
