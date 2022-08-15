<template lang="pug">
  .esgFooter.bt.bw1.mv3.pv3.flex-ns.justify-between.tr.tl-ns
    .mid-gray
      .mb2
        | 由
        a.dim(href="http://www.gcaa.org.tw/") 綠色公民行動聯盟
        | &nbsp;X&nbsp;
        a.dim(href="https://thaubing.gcaa.org.tw/") 透明足跡計畫
        | 推動
      a.dim(href="https://gcaa.neticrm.tw/civicrm/contribute/transact?reset=1&id=41&utm_source=Web&utm_content=ESG_donate&utm_campaign=TB3") 捐款支持
    .mt2.mt0-ns
      .mid-gray
        .mb2
          a.dim(href="https://github.com/gcaa-org-tw/thaubing-esg") 原始碼
          | 以 MIT 釋出
        div
          a.dim(href="https://github.com/gcaa-org-tw/thaubing-esg/tree/main/data") 資料庫
          | 以&nbsp;
          a.dim(href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh_TW") 創用 CC 姓名標示-非商業性 4.0 國際&nbsp;
          | 授權條款釋出
      .light-silver.tr
        | 更新時間： {{buildTime}}
</template>
<script>
export default {
  computed: {
    buildTime () {
      return process.env.buildTime
    }
  }
}
</script>
<style lang="scss" scoped>
.esgFooter {
  border-color: #00000010;
  a {
    color: $green-primary;
    font-weight: 500;
    text-decoration: underline;
  }
}
</style>
