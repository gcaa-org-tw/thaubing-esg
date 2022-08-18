# ESG 檢測儀 - 網站

## 環境需求

1. node 16

## 安裝、開發、發佈流程

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out:

1. [Nuxt documentation](https://nuxtjs.org)
2. [Content module](https://content.nuxtjs.org/)

## 產生 ESG 與企業清單

關於各項資料的來源，請參考[此份共筆](https://hackmd.io/@chengh/SkYHa65nO/https%3A%2F%2Fhackmd.io%2FfiG6aR47Rb2TDPTiaKBmOQ)

```bash
# 重跑 ESG 三類資料
cd tools
./extractAll.sh
```

```bash
# 重跑公司清單
cd tools
rm ../static/content/companyList.csv
node extractCompanyList.js
```

