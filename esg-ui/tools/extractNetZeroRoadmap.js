const fs = require('fs')
const path = require('path')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')
const { companyMap } = require('./utils')
const { CsvWriter, IndustryDetailLogger, finished } = require('./csvLogger')

const DATA_DIR = path.join(__dirname, '../../data')
const END_YEAR = 2050
const BASE_YEAR = 2019

// look last 4 years data
const MAX_LOOK_AHEAD = 4
const REL_PRECISSION = 100

const INDUSTRY_HEADER = [
  { id: 'id', title: '統編' },
  { id: 'year', title: '年份' },
  { id: 'totAbs', title: 'Tot數值' },
  { id: 'totRel', title: 'Tot變化' },
  { id: 'tot1Abs', title: 'Tot1數值' },
  { id: 'tot1Rel', title: 'Tot1變化' },
  { id: 'tot2Abs', title: 'Tot2數值' },
  { id: 'tot2Rel', title: 'Tot2變化' },
  { id: 'isPredicted', title: '是預測值' }
]

const COMPANY_HEADER = INDUSTRY_HEADER.slice(1)

const BAU_LOGGER = new IndustryDetailLogger({
  industryHeader: INDUSTRY_HEADER,
  companyHeader: COMPANY_HEADER,
  filePostfix: '-bau'
})

const OVERVIEW_HEADER = [
  { id: 'id', title: '產業別' },
  ...COMPANY_HEADER
]

const OVERVIEW_LOGGER = new CsvWriter(OVERVIEW_HEADER, 'overview/bau.csv')

function aggregateTot (id, year, stats, { tot, tot1, tot2 }) {
  if (!stats[id]) {
    stats[id] = {}
  }
  if (!stats[id][year]) {
    stats[id][year] = { tot: 0, tot1: 0, tot2: 0 }
  }
  const sum = stats[id][year]
  sum.tot += tot
  sum.tot1 += tot1
  sum.tot2 += tot2
}

function genTotColumn (current, base, field = 'tot') {
  // make it xx.yy% instead of 0.xxyy
  const rel = Math.round(current[field] * 100 * REL_PRECISSION / base[field]) / REL_PRECISSION
  const abs = Math.round(current[field] * REL_PRECISSION) / REL_PRECISSION
  return {
    [`${field}Abs`]: abs,
    [`${field}Rel`]: rel
  }
}

/**
 * Normalize existing data and generate prediction
 *
 * @param id
 * @param { <year>: { tot, tot1, tot2 } } annualStats
 */
function predictBau (annualStats) {
  const statsList = Object.keys(annualStats)
    .map((year) => {
      return { year: year - 0, ...annualStats[year] }
    })
    .sort((a, b) => b.year - a.year)

  if (!annualStats[BASE_YEAR] || statsList.length <= 1) {
    // ignore this raw if no BASE_YEAR data, #121
    return []
  }

  const recentStats = statsList.slice(0, MAX_LOOK_AHEAD)
  const baseStat = statsList.find(stat => stat.year === BASE_YEAR)
  const maxStat = recentStats[0]
  const minStat = recentStats[recentStats.length - 1]
  const nStep = maxStat.year - minStat.year
  const shiftRate = ['tot', 'tot1', 'tot2'].reduce((rate, key) => {
    rate[key] = (maxStat[key] - minStat[key]) / nStep
    return rate
  }, {})

  const rows = statsList.map((stat) => {
    return {
      year: stat.year,
      ...genTotColumn(stat, baseStat, 'tot'),
      ...genTotColumn(stat, baseStat, 'tot1'),
      ...genTotColumn(stat, baseStat, 'tot2')
    }
  })
  for (let yearCursor = maxStat.year + 1; yearCursor <= END_YEAR; yearCursor++) {
    const yearDiff = yearCursor - maxStat.year
    const stat = ['tot', 'tot1', 'tot2'].reduce((stat, key) => {
      stat[key] = maxStat[key] + yearDiff * shiftRate[key]
      if (stat[key] < 0) {
        stat[key] = 0
      }
      return stat
    }, {})
    rows.push({
      year: yearCursor,
      ...genTotColumn(stat, baseStat, 'tot'),
      ...genTotColumn(stat, baseStat, 'tot1'),
      ...genTotColumn(stat, baseStat, 'tot2'),
      isPredicted: 'T'
    })
  }
  return rows
}

async function calculateTot () {
  // 溫室氣體排放
  //   範疇一直接排放data/ghg_p_01.csv#tot
  //   範疇二間接排放data/ghg_p_01.csv#tot2
  const companyStats = {}
  const industryStats = {}
  await new Promise((resolve, reject) => {
    fs
      .createReadStream(path.join(DATA_DIR, 'ghg_p_01.csv'))
      .pipe(new AutoDetectDecoderStream())
      .pipe(new CsvReadableStream({ asObject: true }))
      .on('data', (data) => {
        const company = companyMap.find(data.companyno)
        if (!company || data.cause !== '依法申報' || data.ccksicco1 === '3510') {
          // see #121 for detail filter criteria
          return
        }
        const year = Number.parseInt(data.app_year) + 1911
        const tot = Number.parseFloat(data.tot)
        const tot2 = Number.parseFloat(data.tot2)
        const tot1 = tot - tot2

        const totData = { tot, tot2, tot1 }

        aggregateTot(company.統編, year, companyStats, totData)
        aggregateTot(company.上市上櫃產業編碼, year, industryStats, totData)
      })
      .on('end', () => {
        for (const comId in companyStats) {
          const company = companyMap.find(comId)
          predictBau(companyStats[comId]).forEach((row) => {
            BAU_LOGGER.appendToBoth(company, row)
          })
        }
        for (const indId in industryStats) {
          predictBau(industryStats[indId]).forEach((row) => {
            OVERVIEW_LOGGER.append({
              id: indId,
              ...row
            })
          })
        }
        resolve()
      })
  })
}

async function main () {
  console.warn('[NetZero Roadmap] start')
  await companyMap.finished
  await calculateTot()
  await finished()
  await OVERVIEW_LOGGER.finished()
  console.warn('[NetZero Roadmap] done')
}

main()
