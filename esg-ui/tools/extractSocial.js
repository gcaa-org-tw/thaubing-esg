const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const { companyMap } = require('./utils')
const { appendToBoth, finished } = require('./csvLogger')

const DATA_DIR = path.join(__dirname, '../../data')

function extractSalary () {
  // 員工薪資 data/salary.csv join by stock_code 2018-2020
  return new Promise((resolve, reject) => {
    fs
      .createReadStream(path.join(DATA_DIR, 'salary.csv'))
      .pipe(csv())
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
        appendToBoth(company, {
          ...ctx,
          measure: '平均薪資',
          value: avg
        })
        appendToBoth(company, {
          ...ctx,
          measure: '薪資中位數',
          value: med
        })
      })
      .on('end', () => {
        resolve()
      })
  })
}

async function main () {
  await companyMap.finished
  // 員工數
  //   性別比 TODO
  //   本外勞比 TODO
  //   新進率／離職率 TODO
  // --
  //   員工薪資 data/salary.csv join by stock_code 2018-2020
  await extractSalary()
  //   工時（待確認） TODO
  //   違反勞動法規紀錄 TODO#爬蟲
  // 職業健康與安全
  //   職業健康與安全-重大職災 TODO
  //   職業健康與安全-工安事故 TODO
  await finished()
}

main()
