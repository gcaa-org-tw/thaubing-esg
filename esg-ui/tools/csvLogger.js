const fs = require('fs')
const path = require('path')
const { finished } = require('stream')
const { createObjectCsvStringifier } = require('csv-writer')

const CONTENT_PATH = path.join(__dirname, '../static/content')

const COMPANY_LIST_HEADER = [
  { id: 'name', title: '公司名稱' },
  { id: 'abbr', title: '公司簡稱' },
  { id: 'stockCode', title: '股票代碼' },
  { id: 'id', title: '統編' },
  { id: 'industry', title: '上市上櫃產業別' },
  { id: 'normalizedIndustry', title: '自訂產業別' }
]

const COMPANY_LIST_MAP = header2map(COMPANY_LIST_HEADER)

const INDUSTRY_HEADER = [
  { id: 'id', title: '統編' },
  { id: 'esgCategory', title: '分類' },
  { id: 'category', title: '子分類' },
  { id: 'measure', title: '項目' },
  { id: 'unit', title: '單位' },
  { id: 'year', title: '年份' },
  { id: 'value', title: '數值' }
]

const INDUSTRY_MAP = header2map(INDUSTRY_HEADER)

const COMPANY_HEADER = [
  { id: 'esgCategory', title: '分類' },
  { id: 'category', title: '子分類' },
  { id: 'measure', title: '項目' },
  { id: 'unit', title: '單位' },
  { id: 'year', title: '年份' },
  { id: 'value', title: '數值' }
]

const COMPANY_MAP = header2map(COMPANY_HEADER)

const WRITERS = { companyList: null, industry: {}, company: {} }

class CsvWriter {
  constructor (header, filePath) {
    this.stream = fs.createWriteStream(path.join(CONTENT_PATH, filePath))
    this.csvWriter = createObjectCsvStringifier({ header })
    this.lineCount = 0
    this.stream.write(this.csvWriter.getHeaderString())
  }

  append (row) {
    const csvLine = this.csvWriter.stringifyRecords([row])
    this.stream.write(csvLine)
    this.lineCount += 1
  }

  finished () {
    this.stream.end()
    return new Promise((resolve, reject) => {
      finished(this.stream, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(this.lineCount)
        }
      })
    })
  }
}

function header2map (header) {
  return header.reduce((map, item) => {
    map[item.id] = item.title
    return map
  }, {})
}

function findUndefinedColumn (headerMap, row) {
  return Object.keys(row).find(column => !headerMap[column])
}

function appendCompanyList (row) {
  if (!WRITERS.companyList) {
    WRITERS.companyList = new CsvWriter(COMPANY_LIST_HEADER, 'companyList.csv')
  }
  const undefinedColumn = findUndefinedColumn(COMPANY_LIST_MAP, row)
  if (undefinedColumn) {
    throw new Error(`Undefined company list header: ${undefinedColumn}`)
  }
  WRITERS.companyList.append(row)
}

function appendIndustry (industry, row) {
  if (!WRITERS.industry[industry]) {
    WRITERS.industry[industry] = new CsvWriter(INDUSTRY_HEADER, `industry/${industry}.csv`)
  }
  const undefinedColumn = findUndefinedColumn(INDUSTRY_MAP, row)
  if (undefinedColumn) {
    throw new Error(`Undefined industry header: ${undefinedColumn}`)
  }
  WRITERS.industry[industry].append(row)
}

function appendCompany (company, row) {
  if (!WRITERS.company[company]) {
    WRITERS.company[company] = new CsvWriter(COMPANY_HEADER, `company/${company}.csv`)
  }
  const undefinedColumn = findUndefinedColumn(COMPANY_MAP, row)
  if (undefinedColumn) {
    throw new Error(`Undefined company header: ${undefinedColumn}`)
  }
  WRITERS.company[company].append(row)
}

function waitAllFinished () {
  const promises = []
  if (WRITERS.companyList) {
    promises.push(WRITERS.companyList.finished())
  }
  Object.values(WRITERS.industry).forEach((writer) => {
    promises.push(writer.finished())
  })
  Object.values(WRITERS.company).forEach((writer) => {
    promises.push(writer.finished())
  })
  return Promise.all(promises)
}

module.exports = {
  appendCompanyList,
  appendIndustry,
  appendCompany,
  finished: waitAllFinished
}
