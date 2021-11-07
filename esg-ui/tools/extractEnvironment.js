const fs = require('fs')
const path = require('path')
const { get } = require('lodash')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')
const { companyMap, createCompanyReportStream } = require('./utils')
const { appendToBoth, finished, appendCompany, appendIndustry } = require('./csvLogger')
const { extractFinance } = require('./extractGov')

const DATA_DIR = path.join(__dirname, '../../data')

const EMSP08_PATH = path.join(__dirname, '../assets/emsP08Columns.json')

async function extractWasteFromCom () {
  await new Promise((resolve) => {
    createCompanyReportStream('410840005')
      .on('data', (data) => {
        const company = companyMap.findByStock(data.證券代號)
        if (!company) {
          return
        }
        const year = data.報告書年度
        const fieldList = ['一般事業廢棄物', '有害事業廢棄物', '資源化再利用'].map((name) => {
          return {
            name,
            value: data[name],
            unit: data[`${name}單位`]
          }
        })

        const ctx = {
          esgCategory: 'E',
          category: '廢棄物管理',
          isSelfReport: true,
          year
        }

        fieldList.forEach((row) => {
          if (row.value !== '') {
            appendToBoth(company, {
              ...ctx,
              measure: row.name,
              value: row.value,
              unit: row.unit
            })
          }
        })
      })
      .on('end', () => {
        resolve()
      })
  })
}

function extractAirPollution () {
  // 空氣污染物申報
  //   空氣污染物 data/ems_p_08.csv
  const targetMeasures = JSON.parse(fs.readFileSync(EMSP08_PATH))

  const annualSum = {}
  return new Promise((resolve, reject) => {
    fs
      .createReadStream(path.join(DATA_DIR, 'ems_p_08.csv'))
      .pipe(new AutoDetectDecoderStream())
      .pipe(new CsvReadableStream({ asObject: true }))
      .on('data', (data) => {
        const company = companyMap.findByEmsId(data[Object.keys(data)[0]])
        if (!company) {
          return
        }
        const year = Number.parseInt(data.ReportPeriod.slice(0, 4))

        if (!annualSum[year]) {
          annualSum[year] = {}
        }
        if (!annualSum[year][company.統編]) {
          annualSum[year][company.統編] = {}
        }
        const sum = annualSum[year][company.統編]
        targetMeasures.forEach((measure) => {
          const value = data[measure.column]
          if (!value) {
            return
          }
          if (!sum[measure.label]) {
            sum[measure.label] = 0
          }
          sum[measure.label] += Number.parseFloat(value)
        })
      })
      .on('end', () => {
        for (const year in annualSum) {
          const companySum = annualSum[year]
          for (const id in companySum) {
            const company = companyMap.find(id)
            const ctx = {
              esgCategory: 'E',
              year
            }
            const sum = companySum[id]
            targetMeasures.forEach((measure) => {
              const label = measure.label
              if (!sum[label]) {
                return
              }
              appendToBoth(company, {
                ...ctx,
                category: `空氣污染物申報-${measure.subCat}`,
                measure: label,
                value: sum[label]
              })
            })
          }
        }
        resolve()
      })
  })
}

async function extractPenalty () {
  const annualSum = {}
  const penaltyCat = await new Promise((resolve) => {
    const index = {}
    fs
      .createReadStream(path.join(DATA_DIR, 'penalty_category.csv'))
      .pipe(new AutoDetectDecoderStream())
      .pipe(new CsvReadableStream({ asObject: true }))
      .on('data', (data) => {
        index[data.法規名稱] = data.污染項目
      })
      .on('end', () => {
        resolve(index)
      })
  })
  const penaltyTypes = [...new Set(Object.values(penaltyCat))]

  return new Promise((resolve, reject) => {
    fs
      .createReadStream(path.join(DATA_DIR, 'ems_p_46_20211015.csv'))
      .pipe(new AutoDetectDecoderStream())
      .pipe(new CsvReadableStream({ asObject: true }))
      .on('data', (data) => {
        const company = companyMap.findByEmsId(data.EMS_NO)
        if (!company) {
          return
        }

        const year = (new Date(data.PENALTY_DATE)).getFullYear()
        const penalty = Number.parseFloat(data.PENALTY_MONEY)

        const reasons = data.TRANSGRESS_LAW.split('，')
        let penaltyType = 'misc'
        reasons.some((reason) => {
          if (penaltyCat[reason]) {
            penaltyType = penaltyCat[reason]
            return true
          }
          return false
        })

        if (!annualSum[year]) {
          annualSum[year] = {}
        }
        if (!annualSum[year][company.統編]) {
          annualSum[year][company.統編] = ['all', 'misc', ...penaltyTypes].reduce((sum, type) => {
            sum[type] = { penalty: 0, count: 0 }
            return sum
          }, {})
        }
        const sum = annualSum[year][company.統編]
        if (Number.isNaN(penalty)) {
          console.warn(`Invalid penalty number for ${company.公司名稱}, DOCUMENT_NO: ${data.DOCUMENT_NO}`)
        } else {
          sum.all.penalty += penalty
          sum[penaltyType].penalty += penalty
        }
        sum.all.count += 1
        sum[penaltyType].count += 1
      })
      .on('end', () => {
        for (const year in annualSum) {
          const companySum = annualSum[year]
          for (const id in companySum) {
            const company = companyMap.find(id)
            const penalty = companySum[id]
            const ctx = {
              esgCategory: 'E',
              category: '環境違規',
              year
            }
            Object.keys(penalty).forEach((type) => {
              const ctxMoney = {
                ...ctx,
                measure: '違反環境法規金額',
                value: penalty[type].penalty,
                unit: '元'
              }
              const ctxCount = {
                ...ctx,
                measure: '違反環境法規次數',
                value: penalty[type].count,
                unit: '次'
              }
              if (type === 'all') {
                appendIndustry(company.自訂產業別, {
                  ...ctxMoney,
                  id: company.統編
                })
                appendIndustry(company.自訂產業別, {
                  ...ctxCount,
                  id: company.統編
                })
              } else {
                appendCompany(company.公司簡稱, {
                  ...ctxMoney,
                  measure: `${ctxMoney.measure}-${type}`
                })
                appendCompany(company.公司簡稱, {
                  ...ctxCount,
                  measure: `${ctxCount.measure}-${type}`
                })
              }
            })
          }
        }
        resolve()
      })
  })
}

async function extractWaterUsageFromCom () {
  await new Promise((resolve) => {
    createCompanyReportStream('903558775')
      .on('data', (data) => {
        const company = companyMap.findByStock(data.證券代號)
        if (!company) {
          return
        }
        const year = data.報告書年度
        const fieldList = ['總取水量（不用填寫）', '回收水量', '耗用水量', '排放水量'].map((name) => {
          return {
            name: name.replace(/（.*）/g, ''),
            value: data[name],
            unit: data[`${name}單位`]
          }
        })

        const ctx = {
          esgCategory: 'E',
          category: '水資源',
          isSelfReport: true,
          year
        }

        fieldList.forEach((row) => {
          if (row.value !== '') {
            appendToBoth(company, {
              ...ctx,
              measure: row.name,
              value: row.value,
              unit: row.unit
            })
          }
        })
      })
      .on('end', () => {
        resolve()
      })
  })
}

async function extractPowerUsageFromCom (incomeMap) {
  await new Promise((resolve) => {
    createCompanyReportStream('1196916811')
      .on('data', (data) => {
        const company = companyMap.findByStock(data.證券代號)
        if (!company) {
          return
        }
        const year = data.報告書年度
        const total = data['年度總用電量']
        const fieldList = [
          { name: '總用電量', value: total, unit: data['用電量單位'] },
          { name: '再生能源設置量', value: data['再生能源裝置容量'], unit: data['裝置容量單位'] },
          { name: '再生能源發電量', value: data['再生能源發電量'], unit: data['發電量單位'] }
        ]

        const ctx = {
          esgCategory: 'E',
          category: '能源使用狀況',
          isSelfReport: true,
          year
        }

        fieldList.forEach((row) => {
          if (row.value !== '') {
            appendToBoth(company, {
              ...ctx,
              measure: row.name,
              value: row.value,
              unit: row.unit
            })
          }
        })

        const income = get(incomeMap, `${company.統編}.${year}`)
        if (income && typeof total === 'number') {
          // TODO: handle income or total 無揭露
          appendToBoth(company, {
            ...ctx,
            unit: '度/億元',
            measure: '能源密集度',
            value: total * 10 ** 5 / income
          })
        }
      })
      .on('end', () => {
        resolve()
      })
  })
}

async function extractGhGasFromCom (incomeMap) {
  await new Promise((resolve) => {
    createCompanyReportStream('440421747')
      .on('data', (data) => {
        const company = companyMap.findByStock(data.證券代號)
        if (!company) {
          return
        }
        const year = data.報告書年度
        const totList = [
          { name: '範疇一直接排放', value: data['範疇一（值）'] },
          { name: '範疇二間接排放', value: data['範疇二（值）'] },
          { name: '範疇三其他排放', value: data['範疇三（值）'] }
        ]
        const total = totList.reduce((total, row) => {
          if (typeof row.value === 'number') {
            return total + row.value
          }
          return total
        }, 0)

        const ctx = {
          esgCategory: 'E',
          category: '溫室氣體排放',
          isSelfReport: true,
          year,
          unit: '公噸CO2e'
        }

        totList.forEach((row) => {
          if (row.value !== '') {
            appendToBoth(company, {
              ...ctx,
              measure: row.name,
              value: row.value
            })
          }
        })

        const income = get(incomeMap, `${company.統編}.${year}`)
        if (income && total) {
          // TODO: handle income or total 無揭露
          appendToBoth(company, {
            ...ctx,
            unit: '公噸CO2e/億元',
            measure: '碳密集度',
            value: total * 10 ** 5 / income
          })
        }
      })
      .on('end', () => {
        resolve()
      })
  })
}

async function extractGhGas (incomeMap) {
  // 溫室氣體排放
  //   範疇一直接排放data/ghg_p_01.csv#tot
  //   範疇二間接排放data/ghg_p_01.csv#tot2
  const annualSum = {}
  await new Promise((resolve, reject) => {
    fs
      .createReadStream(path.join(DATA_DIR, 'ghg_p_01.csv'))
      .pipe(new AutoDetectDecoderStream())
      .pipe(new CsvReadableStream({ asObject: true }))
      .on('data', (data) => {
        const company = companyMap.find(data.companyno)
        if (!company) {
          // console.warn(`Company not found, ID: ${data.companyno}, name: ${data.companyname}`)
          return
        }
        const year = Number.parseInt(data.App_year) + 1911
        const tot = Number.parseFloat(data.tot)
        const tot2 = Number.parseFloat(data.Tot2)

        if (!annualSum[year]) {
          annualSum[year] = {}
        }
        if (!annualSum[year][company.統編]) {
          annualSum[year][company.統編] = { tot1: 0, tot2: 0 }
        }
        const sum = annualSum[year][company.統編]
        sum.tot1 += tot - tot2
        sum.tot2 += tot2
      })
      .on('end', () => {
        for (const year in annualSum) {
          const companySum = annualSum[year]
          for (const id in companySum) {
            const company = companyMap.find(id)
            const ctx = {
              esgCategory: 'E',
              category: '溫室氣體排放',
              year,
              unit: '公噸CO2e'
            }
            appendToBoth(company, {
              ...ctx,
              measure: '範疇一直接排放',
              value: companySum[id].tot1
            })

            appendToBoth(company, {
              ...ctx,
              measure: '範疇二間接排放',
              value: companySum[id].tot2
            })

            const income = get(incomeMap, `${id}.${year}`)
            if (income) {
              const totSum = companySum[id].tot1 + companySum[id].tot2
              appendToBoth(company, {
                ...ctx,
                unit: '公噸CO2e/億元',
                measure: '碳密集度',
                value: totSum * 10 ** 5 / income
              })
            }
          }
        }
        resolve()
      })
  })
}

async function genIncomeMap () {
  const financialStatsRaw = await extractFinance(false)
  const financialStats = financialStatsRaw.reduce((stats, row) => {
    if (row.data.measure !== '營業收入') {
      return stats
    }
    const companyId = row.company.統編
    if (!stats[companyId]) {
      stats[companyId] = {}
    }
    stats[companyId][row.data.year] = row.data.value
    return stats
  }, {})
  return financialStats
}

async function main () {
  console.warn('[Environment] start')
  await companyMap.finished
  const incomeMap = await genIncomeMap()
  // 溫室氣體排放
  await extractGhGas(incomeMap)
  await extractGhGasFromCom(incomeMap)
  // 能源使用狀況
  //   總用電量
  //   再生能源用電量
  await extractPowerUsageFromCom(incomeMap)
  // 水資源
  await extractWaterUsageFromCom()
  // 廢棄物管理
  await extractWasteFromCom()
  // 空氣污染物申報
  await extractAirPollution()
  //   違反環境法規紀錄
  await extractPenalty()
  await finished()
  console.warn('[Environment] done')
}

main()
