# ESG 檢測儀 - 資料爬蟲

## 安裝需求

- [Python](https://www.python.org/) 3.9+
- [pipenv](https://pipenv.pypa.io/en/latest/)

## 開發流程

首次使用，需安裝所需套件：

```bash
pip install pipenv  # install pipenv
pipenv install      # install dependencies
```

### 執行爬蟲

```bash
# without year specified
pipenv run scrapy crawl [spider_name]

# with year specified
pipenv run scrapy crawl [spider_name] -a year=[year]
```

#### 參數說明

- `spider_name`：資料爬蟲的蜘蛛名稱，詳見下方可用蜘蛛列表
- `year`：資料爬蟲的年份，選填，預設值為最近年度

### 可用蜘蛛列表

| 蜘蛛 | 說明 | 輸出檔案名 | 前置需求 |
| --- | ---- | -------- | ------- |
| `company_abbr` | 公司基本資料－公司簡稱和公司類型（上市、興櫃、公開發行） | temp/company_abbr.csv | - |
| `company`      | 公司基本資料 | company.csv | `company_abbr` |
| `financial`    | 合併財務報表 | financial/webpages/[year]/*.html | `company` |
| `income`       | 重要會計科目資料 | income.csv | `financial` |
| `salary`       | 員工薪資資料 | salary.csv<br>salary/webpages/*.html | - |
| `shareholding` | 董監事持股餘額明細資料 | shareholding.csv<br>shareholding/webpages/[year]/[stock_code].html | `company` |

#### 欄位說明

- **蜘蛛**：蜘蛛名稱。
- **說明**`：該蜘蛛所爬取的資料集名稱。
- **輸出檔案名**：該蜘蛛所爬取的資料檔名，檔案存於目錄 `$ ./data/` 內。
- **前置需求**：執行該蜘蛛的需求條件，用作該蜘蛛的輸入參數。
