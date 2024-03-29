const fs = require('fs')
const path = require('path')
const got = require('got')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')
const { appendCompanyList, finished } = require('./csvLogger')

// source:
// https://docs.google.com/spreadsheets/d/1MlHvku53sILjjP9asTQSm8f7zsome0FpqiKx9BEXlzQ/edit#gid=0
const LIST_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZKLX4OEhYrQQYEY-l_1W9Ig5Q6_y3f-2u1KBk2xwtB-cMrNdMbCfAuSyoK0iDrpztZtHItvai88IZ/pub?gid=0&single=true&output=csv'

const INDUSTRY_MAP = {
  塑膠工業: '石化業'
  // 化學工業: '石化業'
}

function main () {
  const industries = {}
  got.stream(LIST_URL)
    .pipe(new AutoDetectDecoderStream())
    .pipe(new CsvReadableStream({ asObject: true }))
    .on('data', (data) => {
      const normalizedIndustry = INDUSTRY_MAP[data.industry] || data.industry
      let code = `${data.industry_code}`.padStart(2, 0)
      if (normalizedIndustry in industries) {
        code = industries[normalizedIndustry].code
      } else {
        industries[normalizedIndustry] = {
          label: normalizedIndustry,
          code
        }
      }
      // prevent abbr from invalid file name
      const abbr = data.name_abbr.replace('*', '＊')
      appendCompanyList({
        name: data.name,
        abbr,
        stockCode: data.stock_code,
        id: data.tax_code,
        industry: data.industry,
        industryCode: code,
        normalizedIndustry
      })
    })
    .on('end', async () => {
      const resp = await finished()
      fs.writeFileSync(
        path.join(__dirname, '../assets/industries.json'),
        JSON.stringify(Object.values(industries))
      )
      // eslint-disable-next-line no-console
      console.log(`${resp[0]} company list extracted.`)
    })
}

main()
