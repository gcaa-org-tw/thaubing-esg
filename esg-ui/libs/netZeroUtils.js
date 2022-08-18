import { format, interpolateCividis } from 'd3'
import industries from '~/assets/industries.json'

export const DEFAULT_ZOOM_RANGE = [new Date('2013-01-01'), new Date('2023-01-01')]

export const YEAR = {
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

export function genC3Config (yMax, ext) {
  return {
    point: { r: 2 },
    grid: { y: { show: true } },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          count: 24,
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
    // workaround, zoom behave correctly only when subchart is enabled
    subchart: { show: true },
    zoom: {
      enabled: true,
      extent: [1, 100]
    },
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
