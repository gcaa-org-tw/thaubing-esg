const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const { companyMap } = require('./utils')
const { appendToBoth, finished } = require('./csvLogger')

const DATA_DIR = path.join(__dirname, '../../data')

function extractAirPollution () {
  // 污染管理
  //   空氣污染物 data/ems_p_08.csv
  const targetMeasures = [
    { column: 'Benzene', label: '苯' },
    { column: 'CarbonTetrachloride', label: '四氯化碳' },
    { column: 'Dichloroethane11', label: '1-1-二氯乙烷' },
    { column: 'Dichloroethane12', label: '1-2-二氯乙烷' },
    { column: 'Dioxin', label: '戴奧辛' },
    { column: 'Ethylbenzene', label: '乙苯' },
    { column: 'Methylenechloride', label: '二氯甲烷' },
    { column: 'NOx', label: '氮氧化物' },
    { column: 'SOx', label: '硫氧化物' },
    { column: 'Styrene', label: '苯乙烯' },
    { column: 'TSP', label: '粒狀污染物' },
    { column: 'Tetrachloroethylene', label: '四氯乙烯' },
    { column: 'Toluene', label: '甲苯' },
    { column: 'Trichloroethane', label: '三氯乙烷' },
    { column: 'Trichloroethylene', label: '三氯乙烯' },
    { column: 'VOCs', label: '揮發性有機化合物' },
    { column: 'Xylene', label: '二甲苯' },
    { column: 'chloroform', label: '三氯甲烷' },
    { column: 'heavymetal', label: '重金屬' }
  ]
  // TODO: unable to map FacilityID to company no
  // TODO: no unit in dataset
  return targetMeasures
}

function extractGhGas () {
  // 溫室氣體排放
  //   範疇一（直接排放）data/ghg_p_01.csv#tot
  //   範疇二（間接排放）data/ghg_p_01.csv#tot2
  const annualSum = {}
  return new Promise((resolve, reject) => {
    fs
      .createReadStream(path.join(DATA_DIR, 'ghg_p_01.csv'))
      .pipe(csv())
      .on('data', (data) => {
        const company = companyMap.find(data.companyno)
        if (!company) {
          // console.warn(`Company not found, ID: ${data.companyno}, name: ${data.companyname}`)
          return
        }
        // data.App_year doesn't works as there are some unseen char
        const year = Number.parseInt(data[Object.keys(data)[0]]) + 1911
        const tot = Number.parseFloat(data.tot)
        const tot2 = Number.parseFloat(data.Tot2)

        if (!annualSum[year]) {
          annualSum[year] = {}
        }
        if (!annualSum[year][company.統編]) {
          annualSum[year][company.統編] = { tot: 0, tot2: 0 }
        }
        const sum = annualSum[year][company.統編]
        sum.tot += tot
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
              measure: '範疇一（直接排放）',
              value: companySum[id].tot
            })

            appendToBoth(company, {
              ...ctx,
              measure: '範疇二（間接排放）',
              value: companySum[id].tot2
            })
          }
        }
        resolve()
      })
  })
}

async function main () {
  await companyMap.finished
  // 溫室氣體排放
  await extractGhGas()

  // 能源使用 TODO
  //   總用電量 TODO
  //   再生能源用電量 TODO
  // 用水 TODO
  //   用水量（取水量）
  // 廢棄物管理 TODO
  //   廢棄物項目及量
  // 污染管理
  extractAirPollution()
  //   排放水量 TODO
  //   違反環境法規紀錄 TODO
  //   違反環境法規紀錄 TODO
  await finished()
}

main()
