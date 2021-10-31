const fs = require('fs')
const path = require('path')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')
const { companyMap, createCompanyReportStream } = require('./utils')
const { appendToBoth, finished } = require('./csvLogger')

const DATA_DIR = path.join(__dirname, '../../data')

async function extractWorkInjury () {
  await new Promise((resolve) => {
    createCompanyReportStream('1360813754')
      .on('data', (data) => {
        const company = companyMap.findByStock(data.證券代號)
        if (!company) {
          return
        }
        const year = data.報告書年度

        const ctx = {
          esgCategory: 'S',
          category: '職業健康',
          isSelfReport: true,
          unit: '人',
          year
        }

        const fieldList = [
          { measure: '職災事故', value: data.職災事件數 },
          { measure: '工安意外', value: data.工安意外揭露 }
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
      })
      .on('end', () => {
        resolve()
      })
  })
}

async function extractCrew () {
  await new Promise((resolve) => {
    createCompanyReportStream('2099140890')
      .on('data', (data) => {
        const company = companyMap.findByStock(data.證券代號)
        if (!company) {
          return
        }
        const year = data.報告書年度
        const total = data['總人數\n（前兩項加總）']

        const ctx = {
          esgCategory: 'S',
          category: '員工組成',
          isSelfReport: true,
          unit: '人',
          year
        }

        const fieldList = [
          { measure: '正式員工', value: data.正式人員 },
          { measure: '性別比', value: data.男性正式員工 / data.女性正式員工 },
          { measure: '新進率', value: data.新進人數 / total },
          { measure: '離職率', value: data.離職人數 / total },
          { measure: '是否聘用移工', value: data.移工聘用人數 },
          { measure: '是否聘用身障人士', value: data.身障聘用人數 },
          { measure: '是否聘用原住民', value: data.原民聘用人數 }
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
      })
      .on('end', () => {
        resolve()
      })
  })
}


function extractSalary () {
  // 員工薪資 data/salary.csv join by stock_code 2018-2020
  return new Promise((resolve, reject) => {
    fs
      .createReadStream(path.join(DATA_DIR, 'salary.csv'))
      .pipe(new AutoDetectDecoderStream())
      .pipe(new CsvReadableStream({ asObject: true }))
      .on('data', (data) => {
        const company = companyMap.findByStock(data.stock_code)
        if (!company) {
          return
        }
        const year = Number.parseInt(data.year)
        const avg = Number.parseFloat(data.em_salary_avg)
        const med = Number.parseFloat(data.em_salary_med)
        // check here for raw data
        // https://mops.twse.com.tw/mops/web/t100sb15
        const ctx = {
          esgCategory: 'S',
          category: '員工薪資',
          year,
          unit: '仟元'
        }
        if (avg) {
          appendToBoth(company, {
            ...ctx,
            measure: '平均薪資',
            value: avg
          })
        }
        if (med) {
          appendToBoth(company, {
            ...ctx,
            measure: '薪資中位數',
            value: med
          })
        }
      })
      .on('end', () => {
        resolve()
      })
  })
}

async function main () {
  console.warn('[Social] start')
  await companyMap.finished
  // 員工組成
  //   性別比
  //   本外勞比
  //   新進率／離職率
  await extractCrew()
  // --
  //   員工薪資 data/salary.csv join by stock_code 2018-2020
  await extractSalary()
  //   工時（待確認） TODO
  //   違反勞動法規紀錄 TODO#爬蟲
  // 職業健康與安全
  //   職業健康與安全-重大職災
  //   職業健康與安全-工安事故
  await extractWorkInjury()
  await finished()
  console.warn('[Social] done')
}

main()
