const axios = require('axios')
const resumer = require('resumer')
const csv = require('csv-parser')
const { appendCompanyList, finished } = require('./csvLogger')

const LIST_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRzr0lFprPJzQvjsEHhbaCrxjwYsNqwd53iUzkf3A9kSHSxoJFiQ5Lt1ukSuREu8A/pub?gid=1322020199&single=true&output=csv'

const INDUSTRY_MAP = {
  塑膠工業: '石化業'
}

async function main () {
  let resp
  try {
    resp = await axios.get(LIST_URL)
  } catch (error) {
    console.error(`Failed to download company list because: ${error}`)
    return
  }

  const stream = resumer()
  stream
    .queue(resp.data)
    .pipe(csv())
    .on('data', (data) => {
      const normalizedIndustry = INDUSTRY_MAP[data.industry] || data.industry
      appendCompanyList({
        name: data.name,
        abbr: data.name_abbr,
        stockCode: data.stock_code,
        id: data.tax_code,
        industry: data.industry,
        normalizedIndustry
      })
    })

  setTimeout(async () => {
    const resp = await finished()
    // eslint-disable-next-line no-console
    console.log(`${resp[0]} company list extracted.`)
  })
}

main()
