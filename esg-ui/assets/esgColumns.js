const environment = [
  { subCat: '溫室氣體排放', measure: '範疇一（直接排放）', unit: '公噸CO2e' },
  { subCat: '溫室氣體排放', measure: '範疇二（間接排放）', unit: '公噸CO2e' }
]

const social = [
  { subCat: '員工薪資', measure: '平均薪資', unit: '仟元' },
  { subCat: '員工薪資', measure: '薪資中位數', unit: '仟元' }
]

const governance = [
  { subCat: '', measure: '資本額', unit: '元' },
  { subCat: '收入、成本與淨利', measure: '營業收入', unit: '仟元' },
  { subCat: '收入、成本與淨利', measure: '營業成本', unit: '仟元' },
  { subCat: '收入、成本與淨利', measure: '營業費用', unit: '仟元' },
  { subCat: '收入、成本與淨利', measure: '淨利', unit: '仟元' }
]

export {
  environment,
  governance,
  social
}

export default {
  environment,
  governance,
  social
}
