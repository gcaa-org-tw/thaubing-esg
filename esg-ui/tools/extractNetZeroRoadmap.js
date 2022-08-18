const fs = require('fs')
const path = require('path')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')
const { companyMap, createCompanyReportStream } = require('./utils')
const { CsvWriter, IndustryDetailLogger, finished } = require('./csvLogger')

const DATA_DIR = path.join(__dirname, '../../data')
const END_YEAR = 2050
const BASE_YEAR = 2019

// look last 4 years data
const MAX_LOOK_AHEAD = 4
const REL_PRECISSION = 100

const BAU_HEADER = [
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

const COMPANY_BAU_HEADER = BAU_HEADER.slice(1)

const COMMITMENT_HEADER = [
  { id: 'id', title: '統編' },
  { id: 'year', title: '年份' },
  { id: 'totAbs', title: 'Tot數值' },
  { id: 'totRel', title: 'Tot變化' },
  { id: 'isPredicted', title: '是承諾值' }
]

const COMPANY_COMMITMENT_HEADER = COMMITMENT_HEADER.slice(1)

const BAU_LOGGER = new IndustryDetailLogger({
  industryHeader: BAU_HEADER,
  companyHeader: COMPANY_BAU_HEADER,
  filePostfix: '-bau'
})

const CI_LOGGER = new IndustryDetailLogger({
  industryHeader: COMMITMENT_HEADER,
  companyHeader: COMPANY_COMMITMENT_HEADER,
  filePostfix: '-net-zero-commitment'
})

const BAU_OVERVIEW_HEADER = [
  { id: 'id', title: '產業別' },
  ...COMPANY_BAU_HEADER
]

const BAU_OVERVIEW_LOGGER = new CsvWriter(BAU_OVERVIEW_HEADER, 'overview/bau.csv')

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
  const rel = simplifyValue(current[field] * 100 / base[field])
  const abs = simplifyValue(current[field])
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

function aggregateCommitment (ciRow) {
  const ciBaseYear = ciRow.base_year
  const ciBaseTot = ciRow.base_year_ems

  const breakpointList = ['2025', '2030', '2035', '2040', '2045', '2050']
    .map((year) => {
      const ratio = Number.parseFloat(ciRow[year].slice(0, -1))
      return {
        year: year - 0,
        ratio,
        ciTot: ciBaseTot * ratio / 100
      }
    })
    .filter(row => !Number.isNaN(row.ratio))

  breakpointList.unshift({ year: ciBaseYear, ratio: 100, ciTot: ciBaseTot })

  if (ciRow.companyname === '華夏海灣塑膠股份有限公司') {
    console.warn('qq', ciRow, breakpointList)
  }

  if (breakpointList.length < 2) {
    // should contain at least 2 points, so to draw line
    return null
  }

  const ratioList = { [ciBaseYear]: ciBaseTot }
  let currentRatio = 0
  let currentBase = breakpointList[0]

  for (let year = ciBaseYear + 1; year <= END_YEAR; year++) {
    if (!currentRatio || year > breakpointList[0].year) {
      // in new segment, calculate new ratio
      if (breakpointList.length < 2) {
        // no further commitment
        break
      }
      const ratioDiff = (breakpointList[1].ratio - breakpointList[0].ratio) / 100
      const yearDiff = breakpointList[1].year - breakpointList[0].year
      currentRatio = ratioDiff / yearDiff
      currentBase = breakpointList.shift()
    }
    ratioList[year] = ciBaseTot * (currentBase.ratio / 100 + (year - currentBase.year) * currentRatio)
  }

  return ratioList
}

function calculateCommitment (companyBauList) {
  return new Promise((resolve) => {
    // source:
    // https://docs.google.com/spreadsheets/d/1MWuY0UNQS-0O-ogelG81Vfh7AAeqrxynKPAnPjRH-qs/edit#gid=0
    createCompanyReportStream('0', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQAlorxEbPJeBIaqY2jTvYiMKJoBFBysA2VHdJY_jYO3KBWhHe6pN86-TQRk7T24en2F6C4MJ5dlcEJ/pub?')
      .on('data', (data) => {
        const company = companyMap.findByStock(data.stock_code)
        // TODO: if no 2019?!
        const companyBau = companyBauList.filter(row => row.id === company.統編)
        if (!companyBau.length) {
          return
        }
        const factBase = companyBau.find(row => row.year === BASE_YEAR)
        const factList = companyBau
          .filter(row => !row.isPredicted)
          .sort((a, b) => a.year - b.year)

        const commitmentMap = aggregateCommitment(data)

        if (!commitmentMap) {
          console.error(`Cannot find commitment: ${company.公司名稱} (${company.統編})`)
          return
        }

        factList.forEach((row) => {
          CI_LOGGER.appendToBoth(company, {
            year: row.year,
            totAbs: row.totAbs,
            totRel: row.totRel
          })
        })

        const lastFact = factList[factList.length - 1]

        for (let year = lastFact.year + 1; year <= END_YEAR; year++) {
          const commitment = commitmentMap[year]
          if (!(year in commitmentMap)) {
            continue
          }
          const row = { year, isPredicted: 'T' }

          // commitmentRatio(year) = commitment(year) / exactTot(2019)
          row.totAbs = simplifyValue(commitment)
          row.totRel = simplifyValue(commitment * 100 / factBase.totAbs)

          CI_LOGGER.appendToBoth(company, row)
        }
      })
      .on('end', () => {
        resolve()
      })
  })
}

function simplifyValue (value) {
  return Math.round(value * REL_PRECISSION) / REL_PRECISSION
}

function calculateBau () {
  // 溫室氣體排放  //   範疇一直接排放data/ghg_p_01.csv#tot
  //   範疇二間接排放data/ghg_p_01.csv#tot2
  const companyStats = {}
  const industryStats = {}
  return new Promise((resolve, reject) => {
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
        const companyBauList = []
        for (const comId in companyStats) {
          const company = companyMap.find(comId)
          predictBau(companyStats[comId]).forEach((row) => {
            companyBauList.push({
              id: company.統編,
              ...row
            })
            BAU_LOGGER.appendToBoth(company, row)
          })
        }
        for (const indId in industryStats) {
          predictBau(industryStats[indId]).forEach((row) => {
            BAU_OVERVIEW_LOGGER.append({
              id: indId,
              ...row
            })
          })
        }
        resolve(companyBauList)
      })
  })
}

async function main () {
  console.warn('[NetZero Roadmap] start')
  await companyMap.finished
  const bauList = await calculateBau()
  await calculateCommitment(bauList)
  await finished()
  await BAU_OVERVIEW_LOGGER.finished()
  console.warn('[NetZero Roadmap] done')
}

main()
