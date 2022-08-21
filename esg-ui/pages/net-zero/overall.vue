<template lang="pug">
  .netZero
    .netZero__nav.esgContainer
      .f6.o-60.mb1 產業
      b-dropdown.netZero__typeSelector(aria-role="menu" :scrollable="true" max-height="22rem")
        template(slot="trigger")
          button.flex.justify-between.items-center.w-100.pointer
            .black.f3.flex-auto.tl {{industry.label}}
            i.fas.fa-sort.flex-none
        b-dropdown-item(v-for="opt in industries" :key="opt.code" aria-role="menuitem" :has-link="true")
          nuxt-link(:to="industryLink(opt.code)") {{opt.label}}
    .netZero__legend.thinContainer
      .netZero__legendRow
        net-zero-legend(
          v-for="industry in top5Industries"
          :key="industry.code"
          :title="industry.label"
          :color="industry.color"
        )
      .netZero__legendRow
        net-zero-legend(title="IPCC" :color="chartColors.IPCC" type="roadmap")
        net-zero-legend(title="PNNL" :color="chartColors.PNNL" type="roadmap")
    .netZero__chart.thinContainer
      h2 五大產業維持原狀的碳排成長
      net-zero-overview-bau(
        :bau-stats="bauStats"
        :industry-map="top5IndustryMap"
        :y-max="yMax"
      )
</template>
<script>
import { Y_MAX, COLORS, industryMixin, YEAR, cleanupRawStats, interpolateTop5 } from '~/libs/netZeroUtils'

export default {
  mixins: [industryMixin],
  async asyncData ({ $content, params, redirect }) {
    let bauStats = []

    bauStats = await $content('overview/bau').fetch()
    bauStats = cleanupRawStats(bauStats)

    const top5Industries = bauStats
      .filter(row => row.年份 === YEAR.BASE)
      .sort((a, b) => b.Tot數值 - a.Tot數值)
      .slice(0, 5)
      .reduce((ret, row) => {
        ret[row.產業別] = row
        return ret
      }, {})

    bauStats = bauStats.filter(row => top5Industries[row.產業別])

    return { bauStats, top5IndustryCodes: Object.keys(top5Industries) }
  },
  computed: {
    industry () {
      return this.industries[0]
    },
    top5Industries () {
      const industryMap = this.industries.reduce((sum, industry) => {
        sum[industry.code] = industry
        return sum
      }, {})

      return this.top5IndustryCodes.map((code, i) => {
        return {
          ...industryMap[code],
          color: interpolateTop5(i)
        }
      })
    },
    top5IndustryMap () {
      return this.top5Industries.reduce((sum, industry) => {
        sum[industry.code] = industry
        return sum
      }, {})
    },
    yMax () {
      return this.bauStats.reduce((max, row) => {
        if (max === Y_MAX.MAX) {
          return max
        }
        if (row.Tot變化 > max) {
          return Math.min(row.Tot變化, Y_MAX.MAX)
        }
        return max
      }, Y_MAX.MIN)
    },
    chartColors () {
      return COLORS
    }
  },
  beforeDestroy () {
    // #109, when switch page, html scrollbar disabler is not reset for some reason
    const html = document.querySelector('html')
    if (html.classList.contains('is-clipped-touch')) {
      html.classList.remove('is-clipped-touch')
    }
  }
}
</script>
<style lang="scss" scoped>
.netZero {
  &__nav {
    margin-top: 2.25rem;
    margin-bottom: 1.125rem;
  }
  &__typeSelector {
    width: 8rem;
    ::v-deep() {
      .dropdown-menu {
        min-width: 8rem;
      }
      .dropdown-trigger {
        width: 100%;

        button {
          border: none;
          outline: none;
          background: transparent;
        }
      }

      .dropdown-content {
        background: #333;
      }

      .has-link a {
        padding: 0.5rem;
        color: white;
        font-size: 1.5rem;

        &:hover {
          background: #555;
          color: white;
        }
      }
    }
  }

  &__filter {
    margin: 1.75rem 0 2.25rem;
  }

  &__filterItem {
    line-height: 1.18;
    color: #4A7F2EB3;
    padding-bottom: 0.375rem;
    border-bottom: 1px solid transparent;

    &--active {
      color: #35811C;
      border-color: #35811C;
    }

    &:not(:last-child) {
      margin-right: 1.75rem;
    }

    @include ns-screen {
      font-size: 1.375rem;
    }
  }

  &__legend {
    margin: 2.25rem auto 2.5rem;
  }

  &__legendRow {
    display: grid;
    grid-template-columns: repeat(auto-fit, 6rem);
    row-gap: 0.5rem;
    column-gap: 1rem;

    + .netZero__legendRow {
      margin-top: 1.25rem;
    }
  }

  &__chart {
    margin: 2.5rem auto;

    h2 {
      font-size: 1.375rem;
      margin-bottom: 1.75rem;
      color: #000;
    }
  }
}
</style>
