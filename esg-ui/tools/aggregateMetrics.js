const fs = require('fs')
const path = require('path')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')

const INDUSTRY_DIR = path.join(__dirname, '../static/content/industry')

function calQuartile (valueList) {
  const sortedValues = valueList
    .slice()
    .sort((a, b) => a - b)

  const len = sortedValues.length
  const ret = {
    oneForth: 0,
    thirdForth: 0
  }
  if (len === 1) {
    ret.oneForth = sortedValues[0]
    ret.thirdForth = sortedValues[0]
  } if (len === 2) {
    ret.oneForth = sortedValues[0]
    ret.thirdForth = sortedValues[1]
  } else {
    const oneForthLen = Math.round(len / 4)
    ret.oneForth = (sortedValues[oneForthLen - 1] + sortedValues[oneForthLen]) / 2
    ret.thirdForth = (sortedValues[len - oneForthLen] + sortedValues[len - oneForthLen - 1]) / 2
  }
  return ret
}

function calQuartilePerIndustry (industryName, targetMeasures) {
  const annualRawData = {
    // <year>: {
    //   E: {
    //     <measure>: [<val>, ...],
    //      ...
    //   },
    //   S: ...
    // }
  }
  return new Promise((resolve, reject) => {
    fs
      .createReadStream(path.join(INDUSTRY_DIR, `${industryName}.csv`))
      .pipe(new AutoDetectDecoderStream())
      .pipe(new CsvReadableStream({ asObject: true }))
      .on('data', (data) => {
        const year = data.年份
        const cat = data.分類
        const measure = data.項目
        if (!targetMeasures[cat] || !data.來自公司報告 || !targetMeasures[cat].includes(measure)) {
          return
        }

        if (!annualRawData[year]) {
          annualRawData[year] = Object.keys(targetMeasures).reduce((sum, theCat) => {
            sum[theCat] = targetMeasures[theCat].reduce((measureList, theMeasure) => {
              measureList[theMeasure] = []
              return measureList
            }, {})
            return sum
          }, {})
        }
        const value = Number.parseFloat(data.數值)
        if (!Number.isNaN(value)) {
          annualRawData[year][cat][measure].push(value)
        }
      })
      .on('end', () => {
        const quartile = {}
        Object.keys(annualRawData).forEach((year) => {
          quartile[year] = Object
            .keys(annualRawData[year])
            .reduce((cats, catKey) => {
              cats[catKey] = Object
                .keys(annualRawData[year][catKey])
                .reduce((measures, measureKey) => {
                  const valueList = annualRawData[year][catKey][measureKey]
                  measures[measureKey] = calQuartile(valueList)
                  return measures
                }, {})
              return cats
            }, {})
        })
        fs.writeFileSync(
          path.join(INDUSTRY_DIR, `${industryName}-quartile.json`),
          JSON.stringify(quartile, null, '  ')
        )
        resolve()
      })
  })
}

async function main () {
  const INDUSTRY_LIST = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../assets/industries.json')
  ))
  const DEFS = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../assets/defs.json')
  ))

  await Promise.all(
    INDUSTRY_LIST.map(industry => calQuartilePerIndustry(
      industry,
      DEFS.MAJOR_MEASURE_LIST
    ))
  )
}

main()
