import { format, interpolateCividis } from 'd3'
import { range } from 'lodash'
import industries from '~/assets/industries.json'
import roadmap from '~/static/content/overview/net-zero-roadmap.json'

export const DEFAULT_ZOOM_RANGE = [new Date('2013-01-01'), new Date('2023-01-01')]

export const CI_SUFFIX = '-ci'

export const Y_MAX = {
  MIN: 120,
  MAX: 200
}

export const YEAR = {
  START: 2013,
  BASE: 2019,
  END: 2050
}

export const COLORS = {
  PNNL: '#358D53',
  IPCC: '#FACB3D'
}

export function yFormatter (isPrecise) {
  const formatter = format(isPrecise ? '.1%' : '.0%')
  return val => formatter(val / 100)
}

export const yValueFormatter = yFormatter(true)

const xTickValues = [
  2013,
  ...range(2015, YEAR.END, 5),
  YEAR.END
].map(year => new Date(`${year}-01-01`))

/**
 *
 * @param {Array} stats - [{ Tot變化, 年份, <idColumn>}]
 * @param {Function} getUnitLabel - function (statsRow), return label to be used in chart
 * @param {Function} getUnitColor - function (unitLabel), return color code
 * @param {Function} isDashed  - function (statsRow), return whether this row is predicted / commitment
 */
export function genNetZeroCompanyChartData ({ stats, getUnitLabel, getUnitColor, isDashed }) {
  const data = {}
  const colors = {}
  const annualData = stats.reduce((sum, row) => {
    const year = row.年份
    const unitLabel = getUnitLabel(row)
    if (!sum[year]) {
      sum[year] = {}
    }
    sum[year][unitLabel] = { tot: row.Tot變化, isDashed: isDashed(row) }
    return sum
  }, {})

  roadmap.forEach((row) => {
    if (!annualData[row.year]) {
      annualData[row.year] = {}
    }
    annualData[row.year].PNNL = { tot: row.PNNL * 100, isDashed: false }
    annualData[row.year].IPCC = { tot: row.IPCC * 100, isDashed: false }
  })

  // use 基準年 as basis
  const allUnits = Object.keys(annualData[YEAR.BASE])

  allUnits.forEach((unitLabel) => {
    data[unitLabel] = [unitLabel]
    colors[unitLabel] = getUnitColor(unitLabel)
  })
  colors.PNNL = COLORS.PNNL
  colors.IPCC = COLORS.IPCC

  const yearList = Object.keys(annualData).sort()

  yearList.forEach((year) => {
    allUnits.forEach((unitLabel) => {
      const row = annualData[year][unitLabel]
      const value = !row || row.tot === undefined ? null : row.tot
      if (!row) {
        data[unitLabel].push(null)
      } else if (!row.isDashed) {
        data[unitLabel].push(value)
      } else {
        const ciUnitLabel = `${unitLabel}${CI_SUFFIX}`
        if (!data[ciUnitLabel]) {
          // preserve dashed line in years before it begin
          const emptyValues = data[unitLabel].slice(1).fill(null)
          const factLen = data[unitLabel].length - 1
          // connect fact and commitment line
          emptyValues[factLen - 1] = data[unitLabel][factLen]
          data[ciUnitLabel] = [ciUnitLabel, ...emptyValues]
          colors[ciUnitLabel] = colors[unitLabel]
        }
        data[unitLabel].push(null)
        data[ciUnitLabel].push(value)
      }
    })
  })

  const xData = ['x', ...yearList.map(y => `${y}-01-01`)]

  return {
    x: 'x',
    columns: [
      xData,
      ...Object.values(data)
    ],
    type: 'line',
    types: {
      IPCC: 'area',
      PNNL: 'area'
    },
    colors
  }
}

export function genC3Config (yMax, ext) {
  return {
    point: { r: 2 },
    grid: { y: { show: true } },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          values: xTickValues,
          format: '%Y'
        }
      },
      y: {
        max: yMax,
        tick: {
          format: yFormatter()
        }
      }
    },
    legend: {
      show: false
    },
    // // workaround, zoom behave correctly only when subchart is enabled
    // subchart: { show: true },
    // zoom: {
    //   enabled: true,
    //   extent: [1, 100]
    // },
    ...ext
  }
}

export const companyMixin = {
  computed: {
    companyAbbrMap () {
      return Object.keys(this.companyMap).reduce((ret, id) => {
        const company = this.companyMap[id]
        ret[company.公司簡稱] = company
        return ret
      }, {})
    }
  }
}

export const PER_INDUSTRY_KEY = 'per-industry'

export const industryMixin = {
  computed: {
    industries () {
      const industryList = [
        { label: '跨產業', code: PER_INDUSTRY_KEY },
        ...industries
      ]
      const nIndustry = industryList.length
      return industryList.map((industry, i) => {
        return {
          ...industry,
          color: interpolateCividis(i / nIndustry)
        }
      })
    }
  }
}
