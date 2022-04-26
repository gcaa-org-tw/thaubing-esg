const fs = require('fs')
const path = require('path')
const got = require('got')
const es = require('event-stream')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')

const COMPANY_REPORT_URI = {
  塑膠: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRcO4BFSZGI6GGQExiWs__Y2tBu8Rs4GVTCdv6J-GDLx0CcdqD7jZMDKtDHK5nQ3A/pub?',
  化學: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQH2ytKMQE2RipT0rL4iYcNosbOs41XnSg5RRd4lwKcdgsDZfiSavBWvIqma-lIjxnWNQhb0MmVy6nx/pub?'
}

class CompanyMap {
  constructor () {
    this.list = []
    this.byId = {}
    this.byName = {}
    this.byAbbr = {}
    this.byStock = {}
    this.byEmsId = {}

    this.finished = this.init()
  }

  async init () {
    await new Promise((resolve, reject) => {
      fs
        .createReadStream(path.join(__dirname, '../static/content/companyList.csv'))
        .pipe(new AutoDetectDecoderStream())
        .pipe(new CsvReadableStream({ asObject: true }))
        .on('data', (data) => {
          this.list.push(data)
          this.byId[data.統編] = data
          this.byName[data.公司名稱] = data
          this.byAbbr[data.公司簡稱] = data
          this.byStock[data.股票代碼] = data
        })
        .on('end', () => {
          resolve(this.list)
        })
    })
    await new Promise((resolve, reject) => {
      fs
        .createReadStream(path.join(__dirname, '../../data/ems_id_map.csv'))
        .pipe(new AutoDetectDecoderStream())
        .pipe(new CsvReadableStream({ asObject: true }))
        .on('data', (data) => {
          const company = this.find(data.統一編號)
          if (company) {
            this.byEmsId[data.事業單位編號] = company
          }
        })
        .on('end', () => {
          resolve(this.list)
        })
    })
  }

  find (id) {
    return this.byId[id]
  }

  findByName (name) {
    return this.byName[name]
  }

  findByAbbr (abbr) {
    return this.byAbbr[abbr]
  }

  findByStock (stock) {
    return this.byStock[stock]
  }

  findByEmsId (emsId) {
    return this.byEmsId[emsId]
  }
}

function mergeCompanyReportStream (sheetList = [], onData) {
  return Promise.all(sheetList.map((sheet) => {
    return new Promise((resolve) => {
      const base = COMPANY_REPORT_URI[sheet.industry]
      if (!base) {
        throw new Error(`Undefined industry: ${sheet.industry}`)
      }
      createCompanyReportStream(sheet.id, base)
        .on('data', onData)
        .on('end', () => {
          resolve()
        })
    })
  }))
}

function createCompanyReportStream (sheetId, apiBase) {
  const query = [
    `gid=${sheetId}`,
    'single=true',
    'output=csv'
  ].join('&')
  const endpoint = `${apiBase || COMPANY_REPORT_URI.塑膠工業}${query}`
  return got.stream(endpoint)
    .pipe(new AutoDetectDecoderStream())
    .pipe(new CsvReadableStream({ asObject: true }))
    .pipe(es.through(function write (data) {
      const ret = Object.keys(data).reduce((ret, key) => {
        // convert locale string to number
        // ex: 5,178,431.000
        const value = data[key]
        const number = Number.parseFloat(value.replace(/,/g, ''))
        if (Number.isNaN(number) || value.match(/[^\d,.-]/)) {
          ret[key] = value
        } else {
          ret[key] = number
        }
        return ret
      }, {})
      this.emit('data', ret)
    }))
}

const companyMap = new CompanyMap()

module.exports = {
  companyMap,
  createCompanyReportStream,
  mergeCompanyReportStream
}
