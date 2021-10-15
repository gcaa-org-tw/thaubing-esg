import emsP08Columns from './emsP08Columns'

const environment = [
  { subCat: '溫室氣體排放', measure: '範疇一直接排放', unit: '公噸CO2e', toFixed: 2 },
  { subCat: '溫室氣體排放', measure: '範疇二間接排放', unit: '公噸CO2e', toFixed: 2 },
  { subCat: '溫室氣體排放', measure: '碳密集度', unit: '公噸CO2e/億元', toFixed: 2 },
  { subCat: '能源使用', measure: '總用電量', isFake: true },
  { subCat: '能源使用', measure: '再生能源用電量', isFake: true },
  { subCat: '用水', measure: '用水量取水量', isFake: true },
  { subCat: '廢棄物管理', measure: '廢棄物項目及量', isFake: true },
  ...emsP08Columns.map((column) => {
    return {
      subCat: '污染管理',
      measure: column.label,
      toFixed: 2,
      isAirPollution: true
    }
  }),
  { subCat: '污染管理', measure: '排放水量', isFake: true },
  { subCat: '污染管理', measure: '違反環境法規金額', unit: '元' },
  { subCat: '污染管理', measure: '違反環境法規次數', unit: '次' }
]

const social = [
  { subCat: '員工數', measure: '性別比', isFake: true },
  { subCat: '員工數', measure: '本外勞比', isFake: true },
  { subCat: '員工數', measure: '身障聘用', isFake: true },
  { subCat: '員工數', measure: '原民聘用', isFake: true },
  { subCat: '員工數', measure: '新進率／離職率', isFake: true },
  { subCat: '員工薪資', measure: '平均薪資', unit: '仟元' },
  { subCat: '員工薪資', measure: '薪資中位數', unit: '仟元' },
  { subCat: '', measure: '工時', isFake: true },
  { subCat: '', measure: '違反勞動法規紀錄', isFake: true },
  { subCat: '職業健康與安全', measure: '重大職災', isFake: true },
  { subCat: '職業健康與安全', measure: '工安事故', isFake: true }
]

const governance = [
  { subCat: '', measure: '資本額', unit: '元' },
  { subCat: '是否產製CSR報告', measure: '是否揭露不利資訊', isFake: true },
  { subCat: '收入、成本與淨利', measure: '營業收入', unit: '仟元' },
  { subCat: '收入、成本與淨利', measure: '營業成本', unit: '仟元' },
  { subCat: '收入、成本與淨利', measure: '營業費用', unit: '仟元' },
  { subCat: '收入、成本與淨利', measure: '淨利', unit: '仟元' },
  { subCat: '稅務透明度', measure: '租稅減免', isFake: true },
  { subCat: '稅務透明度', measure: '補助、補貼', isFake: true },
  { subCat: '', measure: 'ISO認證', isFake: true }
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
