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
  { id: 'industryCode', title: '上市上櫃產業編碼' },
  { id: 'normalizedIndustry', title: '自訂產業別' }
]

const COMPANY_LIST_MAP = header2map(COMPANY_LIST_HEADER)

const INDUSTRY_HEADER = [
  { id: 'id', title: '統編' },
  { id: 'esgCategory', title: '分類' },
  { id: 'category', title: '子分類' },
  { id: 'measure', title: '項目' },
  { id: 'isSelfReport', title: '來自公司報告' },
  { id: 'unit', title: '單位' },
  { id: 'year', title: '年份' },
  { id: 'value', title: '數值' }
]

const COMPANY_HEADER = [
  { id: 'esgCategory', title: '分類' },
  { id: 'category', title: '子分類' },
  { id: 'measure', title: '項目' },
  { id: 'isSelfReport', title: '來自公司報告' },
  { id: 'unit', title: '單位' },
  { id: 'year', title: '年份' },
  { id: 'value', title: '數值' }
]

const WRITERS = { companyList: null, industry: {}, company: {} }

class CsvWriter {
  constructor (header, filePath) {
    const targetPath = path.join(CONTENT_PATH, filePath)
    let isExisted = false
    try {
      fs.accessSync(targetPath, fs.constants.W_OK)
      isExisted = true
    } catch {
      isExisted = false
    }
    this.stream = fs.createWriteStream(targetPath, { flags: 'a' })
    this.csvWriter = createObjectCsvStringifier({ header })
    this.lineCount = 0

    if (!isExisted) {
      this.stream.write(this.csvWriter.getHeaderString())
    }
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

class IndustryDetailLogger {
  constructor ({ industryHeader = INDUSTRY_HEADER, companyHeader = COMPANY_HEADER, filePostfix = '' }) {
    this.industryHeader = industryHeader
    this.industryMap = header2map(industryHeader)
    this.companyHeader = companyHeader
    this.companyMap = header2map(companyHeader)
    this.filePostfix = filePostfix
  }

  appendIndustry (industry, row) {
    const id = `${industry}${this.filePostfix}`
    if (!WRITERS.industry[id]) {
      WRITERS.industry[id] = new CsvWriter(this.industryHeader, `industry/${id}.csv`)
    }
    const undefinedColumn = findUndefinedColumn(this.industryMap, row)
    if (undefinedColumn) {
      throw new Error(`Undefined industry header: ${undefinedColumn}`)
    }
    // TODO: better encapsulation, no global variable
    WRITERS.industry[id].append(row)
  }

  appendCompany (company, row) {
    const id = `${company}${this.filePostfix}`
    if (!WRITERS.company[id]) {
      WRITERS.company[id] = new CsvWriter(this.companyHeader, `company/${id}.csv`)
    }
    const undefinedColumn = findUndefinedColumn(this.companyMap, row)
    if (undefinedColumn) {
      throw new Error(`Undefined company header: ${undefinedColumn}`)
    }
    WRITERS.company[id].append(row)
  }

  appendToBoth (company, row) {
    if ('value' in row && (Number.isNaN(row.value) || row.value === undefined)) {
      throw new Error(`Get NaN or undefined on company: ${company.公司簡稱}:${company.股票代碼}, year: ${row.year}, measure: ${row.measure}, value: ${row.value}`)
    }
    this.appendIndustry(company.上市上櫃產業編碼, {
      ...row,
      id: company.統編
    })
    this.appendCompany(company.公司簡稱, row)
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

const defaultCompondLogger = new IndustryDetailLogger({
  industryHeader: INDUSTRY_HEADER,
  companyHeader: COMPANY_HEADER
})

module.exports = {
  appendCompanyList,
  appendIndustry: defaultCompondLogger.appendIndustry.bind(defaultCompondLogger),
  appendCompany: defaultCompondLogger.appendCompany.bind(defaultCompondLogger),
  appendToBoth: defaultCompondLogger.appendToBoth.bind(defaultCompondLogger),
  finished: waitAllFinished
}
