const fs = require('fs')
const path = require('path')
const got = require('got')
const es = require('event-stream')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')

const COMPANY_REPORT_URI = {
  塑膠: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRcO4BFSZGI6GGQExiWs__Y2tBu8Rs4GVTCdv6J-GDLx0CcdqD7jZMDKtDHK5nQ3A/pub?',
  化學: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQH2ytKMQE2RipT0rL4iYcNosbOs41XnSg5RRd4lwKcdgsDZfiSavBWvIqma-lIjxnWNQhb0MmVy6nx/pub?',
  水泥鋼鐵半導體: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTQuA2j68_8X9Ywsb8uYYgkFdvIfsVbo-OWOGyxOvVAuU4X7SyWx1iW_9qwA-EGrcXj9FflHpKOgAWo/pub?',
  金融保險: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5z5I4NiYF-5Dp8ASTgJm6ffVr_8hP1KW2Or6LoyaLMZepJcZ8Nr3gm3H2aOjrY89yb00elQEMNdP-/pub?',
  上櫃溫室氣體: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4z2S6J6CfMoafmp_OjyVvfxWnyMoyyEnYiER0Uom-tV-zu7DpVOQ-OvzllvunsY0ZWjFn0OqqTOYF/pub?',
  上市溫室氣體: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT73UOexkLGUOrXm9IrUvcdmUGXg4AxnnG3mKXfTGj2Y4a6bSvKgEOyC5jsEDa7ce56MQILPI1JmYsK/pub?',
  二零二一: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMAEZJkJDu6O5mKgv0-otYXdctz9TXmjwBuqL-QPbQYmAE1ZP6Go8Ba_ceRIuy17KxoPxRAOedRrRz/pub?',
  二零二二: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpL_n2PkuM3JHZNNA-3e-yMVPyz25ijy9pO0QYlwqYj3P7q8S--yi58ror6KKzQjsqFcqQlQ7vyxm3/pub?'
}

const ANNUAL_REPORT_MAP = new Map([
  [
    '二零二一',
    [1619780292, 944009336, 469468341, 335035328, 971750723, 726271039, 125777543].map(id => ({ id, industry: '二零二一' }))
  ],
  [
    '二零二二',
    [639017897, 224370356, 963811152, 1217727816, 2031131799, 1162537800, 827829518].map(id => ({ id, industry: '二零二二' }))
  ]
])

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

/**
 * get value from multiple columns, return the first non-empty value
 */
function cs2v (data, ...columns) {
  for (const column of columns) {
    if (column in data) {
      return data[column]
    }
  }
  return undefined
}

module.exports = {
  ANNUAL_REPORT_MAP,
  companyMap,
  cs2v,
  createCompanyReportStream,
  mergeCompanyReportStream
}
