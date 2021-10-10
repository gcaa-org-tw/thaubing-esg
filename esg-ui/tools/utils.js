const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')

class CompanyMap {
  constructor () {
    this.list = []
    this.byId = {}
    this.byName = {}
    this.byAbbr = {}

    this.finished = this.init()
  }

  init () {
    return new Promise((resolve, reject) => {
      fs
        .createReadStream(path.join(__dirname, '../static/content/companyList.csv'))
        .pipe(csv())
        .on('data', (data) => {
          this.list.push(data)
          this.byId[data.統編] = data
          this.byName[data.公司名稱] = data
          this.byAbbr[data.公司簡稱] = data
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
}

const companyMap = new CompanyMap()

module.exports = {
  companyMap
}
