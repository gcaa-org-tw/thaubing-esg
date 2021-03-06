const fs = require('fs')
const path = require('path')
const got = require('got')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')
const { appendCompanyList, finished } = require('./csvLogger')

const LIST_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRzr0lFprPJzQvjsEHhbaCrxjwYsNqwd53iUzkf3A9kSHSxoJFiQ5Lt1ukSuREu8A/pub?gid=1322020199&single=true&output=csv'

const INDUSTRY_MAP = {
  塑膠工業: '石化業'
  // 化學工業: '石化業'
}

function main () {
  const industries = []
  got.stream(LIST_URL)
    .pipe(new AutoDetectDecoderStream())
    .pipe(new CsvReadableStream({ asObject: true }))
    .on('data', (data) => {
      const normalizedIndustry = INDUSTRY_MAP[data.industry] || data.industry
      industries[data.industry_code] = {
        label: normalizedIndustry,
        code: data.industry_code
      }
      appendCompanyList({
        name: data.name,
        abbr: data.name_abbr,
        stockCode: data.stock_code,
        id: data.tax_code,
        industry: data.industry,
        industryCode: data.industry_code,
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
