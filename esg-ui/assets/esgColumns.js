import emsP08Columns from './emsP08Columns.json'

const environment = [
  { subCat: '溫室氣體排放', measure: '範疇一直接排放', unit: '公噸CO2e', toFixed: 2 },
  { subCat: '溫室氣體排放', measure: '範疇二間接排放', unit: '公噸CO2e', toFixed: 2 },
  { subCat: '溫室氣體排放', measure: '範疇一直接排放', isSelfReport: true, unit: '公噸CO2e', toFixed: 2 },
  { subCat: '溫室氣體排放', measure: '範疇二間接排放', isSelfReport: true, unit: '公噸CO2e', toFixed: 2 },
  { subCat: '溫室氣體排放', measure: '範疇三其他排放', isSelfReport: true, unit: '公噸CO2e', toFixed: 2 },
  { subCat: '溫室氣體排放', measure: '碳密集度', isSelfReport: true, unit: '公噸CO2e/億元', toFixed: 2 },
  { subCat: '能源使用狀況', measure: '總用電量', unit: '度', isSelfReport: true },
  { subCat: '能源使用狀況', measure: '再生能源設置量', unit: 'KW', isSelfReport: true },
  { subCat: '能源使用狀況', measure: '再生能源發電量', unit: '度', isSelfReport: true },
  { subCat: '能源使用狀況', measure: '能源密集度', unit: '度/億元', isSelfReport: true },
  { subCat: '水資源', measure: '總取水量', unit: '噸', isSelfReport: true },
  { subCat: '水資源', measure: '回收水量', unit: '噸', isSelfReport: true },
  { subCat: '水資源', measure: '耗用水量', unit: '噸', isSelfReport: true },
  { subCat: '水資源', measure: '排放水量', unit: '噸', isSelfReport: true },
  ...emsP08Columns
    .filter(column => column.subCat)
    .map((column) => {
      return {
        subCat: `空氣污染物申報-${column.subCat}`,
        measure: column.label,
        unit: column.unit,
        toFixed: 2,
        isAirPollution: true
      }
    }),
  { subCat: '廢棄物管理', measure: '一般事業廢棄物', unit: '噸', isSelfReport: true },
  { subCat: '廢棄物管理', measure: '有害事業廢棄物', unit: '噸', isSelfReport: true },
  { subCat: '廢棄物管理', measure: '資源化再利用', unit: '噸', isSelfReport: true },
  { subCat: '毒化物申報', measure: '毒化物', isFake: true },
  { subCat: '環境違規', measure: '違反環境法規金額', unit: '元' },
  { subCat: '環境違規', measure: '違反環境法規金額-空氣', unit: '元', onlyDetail: true },
  { subCat: '環境違規', measure: '違反環境法規金額-水', unit: '元', onlyDetail: true },
  { subCat: '環境違規', measure: '違反環境法規金額-misc', unit: '元', onlyDetail: true },
  { subCat: '環境違規', measure: '違反環境法規次數', unit: '次' }
]

const social = [
  { subCat: '員工組成', measure: '正式員工', isSelfReport: true, unit: '人' },
  { subCat: '員工組成', measure: '性別比', isSelfReport: true, unit: '男/女' },
  { subCat: '員工組成', measure: '新進率', isSelfReport: true, unit: '' },
  { subCat: '員工組成', measure: '離職率', isSelfReport: true, unit: '' },
  { subCat: '員工組成', measure: '是否聘用移工', isSelfReport: true, unit: '人' },
  { subCat: '員工組成', measure: '是否聘用身障人士', isSelfReport: true, unit: '人' },
  { subCat: '員工組成', measure: '是否聘用原住民', isSelfReport: true, unit: '人' },
  { subCat: '員工薪資', measure: '平均薪資', unit: '仟元' },
  { subCat: '員工薪資', measure: '薪資中位數', unit: '仟元' },
  { subCat: '勞動違規', measure: '違反勞動法規紀錄', isFake: true },
  { subCat: '職業健康', measure: '職災事故', isSelfReport: true },
  { subCat: '職業健康', measure: '工安意外', isSelfReport: true }
]

const governance = [
  { subCat: '資本額', measure: '資本額', unit: '元' },
  { subCat: '營運狀況', measure: '營業收入', unit: '仟元' },
  { subCat: '營運狀況', measure: '營業成本', unit: '仟元' },
  { subCat: '營運狀況', measure: '營業費用', unit: '仟元' },
  { subCat: '營運狀況', measure: '淨利', unit: '仟元' },
  { subCat: '是否產製CSR報告', measure: '是否編撰報告書', isSelfReport: true },
  // { subCat: '是否產製CSR報告', measure: '是否揭露負面資訊', isFake: true },
  { subCat: '稅務透明度', measure: '營利事業所得稅稅額', isSelfReport: true, unit: '元' },
  { subCat: '稅務透明度', measure: '政府補助、補貼金額', isSelfReport: true, unit: '元' },
  { subCat: '稅務透明度', measure: '研發投入費用', isSelfReport: true, unit: '元' },
  { subCat: 'ISO認證', measure: 'ISO 9001', isSelfReport: true },
  { subCat: 'ISO認證', measure: 'ISO 14001', isSelfReport: true },
  { subCat: 'ISO認證', measure: 'ISO 45001', isSelfReport: true },
  { subCat: 'ISO認證', measure: 'ISO 50001', isSelfReport: true }
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
