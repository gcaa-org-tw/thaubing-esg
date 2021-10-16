const fs = require('fs')
const path = require('path')
const CsvReadableStream = require('csv-reader')
const AutoDetectDecoderStream = require('autodetect-decoder-stream')

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

const companyMap = new CompanyMap()

module.exports = {
  companyMap
}
