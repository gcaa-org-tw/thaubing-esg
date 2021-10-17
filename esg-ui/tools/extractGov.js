const fs = require('fs')
const path = require('path')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')
const { companyMap } = require('./utils')
const { appendToBoth, finished } = require('./csvLogger')

const DATA_DIR = path.join(__dirname, '../../data')

function extractCap () {
  // 資本額 data/BGMOPEN1.csv#資本額
  return new Promise((resolve, reject) => {
    fs
      .createReadStream(path.join(DATA_DIR, 'BGMOPEN1.csv'))
      .pipe(new AutoDetectDecoderStream())
      .pipe(new CsvReadableStream({ asObject: true }))
      .on('data', (data) => {
        const company = companyMap.find(data.統一編號)
        if (!company) {
          return
        }
        const cap = Number.parseFloat(data.資本額)
        const ctx = {
          esgCategory: 'G',
          category: '資本額',
          measure: '資本額',
          unit: '元',
          value: cap
        }
        appendToBoth(company, {
          ...ctx,
          year: 2020
        })
        appendToBoth(company, {
          ...ctx,
          year: 2019
        })
      })
      .on('end', () => {
        resolve()
      })
  })
}

function extractFinance (toFile = true) {
  // 營運狀況 data/income.csv#total_operating_revenue 2016-2020
  return new Promise((resolve, reject) => {
    const stats = []
    fs
      .createReadStream(path.join(DATA_DIR, 'income.csv'))
      .pipe(new AutoDetectDecoderStream())
      .pipe(new CsvReadableStream({ asObject: true }))
      .on('data', (data) => {
        const company = companyMap.findByStock(data.stock_code)
        if (!company) {
          return
        }
        const year = Number.parseInt(data.year)
        const measures = [
          { measure: '營業收入', value: Number.parseFloat(data.total_operating_revenue) },
          { measure: '營業成本', value: Number.parseFloat(data.total_operating_costs) },
          { measure: '營業費用', value: Number.parseFloat(data.total_operating_expenses) },
          { measure: '淨利', value: Number.parseFloat(data.profit_or_loss) }
        ]
        // check 公開資訊觀測站 for example data & unit
        // https://mops.twse.com.tw/mops/web/t146sb05
        const ctx = {
          esgCategory: 'G',
          category: '營運狀況',
          unit: '仟元',
          year
        }
        measures.forEach((item) => {
          const data = {
            ...ctx,
            ...item
          }
          if (toFile) {
            appendToBoth(company, data)
          } else {
            stats.push({ company, data })
          }
        })
      })
      .on('end', () => {
        resolve(stats)
      })
  })
}

async function main () {
  console.warn('[Gov] start')
  await companyMap.finished
  // 資本額
  await extractCap()
  // 是否產製CSR報告，是否揭露不利資訊 TODO
  // 營運狀況
  await extractFinance()
  // 稅務透明度-租稅減免 TODO
  // 稅務透明度-補助、補貼 TODO
  await finished()
  console.warn('[Gov] done')
}

if (require.main === module) {
  main()
}

module.exports = {
  extractCap,
  extractFinance
}
