const fs = require('fs')
const path = require('path')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')
const { companyMap, createCompanyReportStream, mergeCompanyReportStream } = require('./utils')
const { appendToBoth, finished, appendIndustry } = require('./csvLogger')

const DATA_DIR = path.join(__dirname, '../../data')

async function extractEsgIndexFromCom () {
  await new Promise((resolve) => {
    createCompanyReportStream('580664726', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCiyzgDnjrQVIJ0H5xLFJDjmhQhVoBqfEAZRPVG0JfQcVGnJTcLorgF3d02pERBO2GYkv7i8kbuWJA/pub?')
      .on('data', (data) => {
        const company = companyMap.findByStock(data.證券代號)
        if (!company) {
          return
        }
        const year = data.報告書年度
        const indexList = [
          '中國信託臺灣ESG永續關鍵半導體ETF基金',
          '元大臺灣ESG永續ETF基金',
          '永豐台灣ESG永續優質ETF基金',
          '國泰ESG永續高股息',
          '富邦臺灣公司治理100基金'
        ]

        const ctx = {
          esgCategory: 'X',
          category: '相關金融商品',
          year
        }

        indexList.forEach((index) => {
          if (data[index]) {
            appendIndustry(company.上市上櫃產業編碼, {
              ...ctx,
              measure: index,
              value: 'T',
              id: company.統編
            })
          }
        })
      })
      .on('end', () => {
        resolve()
      })
  })
}

function extractISOFromCom () {
  return mergeCompanyReportStream(
    [
      { id: '1256605170', industry: '塑膠' },
      { id: '1680588036', industry: '化學' },
      { id: '1680588036', industry: '水泥鋼鐵半導體' }
    ],
    (data) => {
      const company = companyMap.findByStock(data.證券代號)
      if (!company) {
        return
      }
      const year = data.報告書年度

      const ctx = {
        esgCategory: 'G',
        category: 'ISO認證',
        isSelfReport: true,
        year
      }
      const fieldList = [
        { measure: 'ISO 9001', value: data['ISO 9001（品質管理系統）'] },
        { measure: 'ISO 14001', value: data['ISO 14001（環境管理系統）'] },
        { measure: 'ISO 45001', value: data['ISO 45001（職業安全衛生管理系統）'] },
        { measure: 'ISO 50001', value: data['ISO 50001（能源管理系統）'] }
      ]

      fieldList.forEach((row) => {
        if (row.value !== '') {
          appendToBoth(company, {
            ...ctx,
            measure: row.measure,
            value: row.value
          })
        }
      })
    }
  )
}

function extractHasCsrFromCom () {
  return mergeCompanyReportStream(
    [
      { id: '1762045206', industry: '塑膠' },
      { id: '567687738', industry: '化學' },
      { id: '967180348', industry: '水泥鋼鐵半導體' }
    ],
    (data) => {
      const company = companyMap.findByStock(data.證券代號)
      if (!company) {
        return
      }
      const year = data.報告書年度
      const value = data.是否編撰報告書

      appendToBoth(company, {
        esgCategory: 'G',
        category: '是否產製CSR報告',
        isSelfReport: true,
        year,
        measure: '是否編撰報告書',
        value
      })
    }
  )
}

function extractTransparencyFromCom () {
  return mergeCompanyReportStream(
    [
      { id: '721116469', industry: '塑膠' },
      { id: '1634361752', industry: '化學' },
      { id: '1634361752', industry: '水泥鋼鐵半導體' }
    ],
    (data) => {
      const company = companyMap.findByStock(data.證券代號)
      if (!company) {
        return
      }
      const year = data.報告書年度

      const ctx = {
        esgCategory: 'G',
        category: '稅務透明度',
        isSelfReport: true,
        unit: '元',
        year
      }

      const fieldList = [
        { measure: '營利事業所得稅稅額', value: data.營利事業所得稅繳納金額 },
        { measure: '政府補助、補貼金額', value: data.政府補助總金額 },
        { measure: '研發投入費用', value: data.研發經費投入金額 }
      ]

      fieldList.forEach((row) => {
        if (row.value !== '' && !Number.isNaN(row.value)) {
          appendToBoth(company, {
            ...ctx,
            measure: row.measure,
            value: row.value
          })
        }
      })
    }
  )
}

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
            if (Number.isNaN(data.value)) {
              console.warn(`Field "${item.measure}" = NaN on ${company.公司名稱} / ${year}`)
            } else {
              appendToBoth(company, data)
            }
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
  // 是否產製CSR報告，是否揭露不利資訊
  await extractHasCsrFromCom()
  // 營運狀況
  await extractFinance()
  // 稅務透明度-租稅減免
  // 稅務透明度-補助、補貼
  await extractTransparencyFromCom()
  await extractISOFromCom()
  // 基金投資標的
  await extractEsgIndexFromCom()
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
