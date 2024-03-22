# thaubing-esg > data

政府端取得的公開資料說明如下
另外儲存於：[ESG檢測儀雲端](https://drive.google.com/drive/folders/1Yq_3xqW0IQE9I0dGsmNoJRbCnd0YvX6M?usp=drive_link)

- `company_twse.csv` — 公司基本資料。
  - 原始資料來源：政府資料開放平台；[上市公司基本資料](https://data.gov.tw/dataset/18419)、[上櫃公司基本資料](https://data.gov.tw/dataset/25036)、[興櫃公司基本資料](https://data.gov.tw/dataset/28568)、[公開發行公司基本資料](https://data.gov.tw/dataset/28567)
  - 是否需要再整理：是，僅保留所需欄位
  - 手動更新頻率：每季
  - 整理後，一併更新至[線上試算表](https://docs.google.com/spreadsheets/d/1MlHvku53sILjjP9asTQSm8f7zsome0FpqiKx9BEXlzQ/edit#gid=0)，供相關網站使用
- `ems_s_01.csv` － 環境保護許可管理系統(暨解除列管)對象基本資料。
  - 原始資料來源：環境資料開放平臺；[環境保護許可管理系統(暨解除列管)對象基本資料](https://data.moenv.gov.tw/dataset/detail/EMS_S_01)
  - 是否需要再整理：否
  - 手動更新頻率：每季
- `ems_p_08.csv` － 各工廠空氣污染物排放資料。
  - 原始資料來源：環境資料開放平臺；[各工廠空氣污染物排放資料](https://data.moenv.gov.tw/dataset/detail/EMS_P_08)
  - 是否需要再整理：否
  - 手動更新頻率：每季
- `ems_p_46.csv` － 列管事業污染源裁處資料。
  - 原始資料來源：環境資料開放平臺；[列管事業污染源裁處資料](https://data.moenv.gov.tw/dataset/detail/EMS_P_46)
  - 是否需要再整理：是，移除不計入項目
  - 手動更新頻率：每月
- `ghg_p_01.csv` － 溫室氣體年排放量。
  - 原始資料來源：環境資料開放平臺；[溫室氣體年排放量](https://data.moenv.gov.tw/dataset/detail/GHG_P_01)
  - 是否需要再整理：否
  - 手動更新頻率：每年

爬蟲所得的未清理原始資料，另存放於[thaubing-esg-raw-data](https://github.com/gcaa-org-tw/thaubing-esg-raw-data)

- `company.csv` — 公司登記基本資料。原始資料來源：經濟部商業司
- `income.csv` — 公司營收資料。原始資料來源：公開資訊觀測站，各公司財務報表之重點會計科目
- `BGMOPEN1.csv` — 公司（含未上市櫃）資本額資料，取自全國營業(稅籍)登記資料集。原始資料來源：財政部
- `salary.csv` — 非擔任主管職務之全時員工資訊。原始資料來源：公開資訊觀測站
- `ems_id_map.csv` - 管制編號與公司名、統編的對照表。原始資料來源：透明足跡網站
- `id_company_target.csv` - 公司溫室氣體排放及減量資訊。原始資料來源：公開資訊觀測站 (sii = 上市、otc = 上櫃、rotc = 興櫃、pub = 公開發行)
