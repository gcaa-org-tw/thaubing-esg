<template lang="pug">
  .footer.bt.bw1.mv3.pv3.flex-ns.justify-between.tr.tl-ns
    .mid-gray
      | 由
      a.dim(href="http://www.gcaa.org.tw/") 綠色公民行動聯盟
      | &nbsp;X&nbsp;
      a.dim(href="https://thaubing.gcaa.org.tw/") 透明足跡計畫
      | 推動
    .mt2.mt0-ns
      .mid-gray.mb2
        a.dim(href="https://github.com/gcaa-org-tw/thaubing-esg") 原始碼
        | &nbsp;X&nbsp;
        a.dim(href="https://github.com/gcaa-org-tw/thaubing-esg/tree/main/data") 資料
        | &nbsp; 以開放授權 MIT / CC-BY 4.0 釋出
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
.footer {
  border-color: #00000010;
  a {
    color: $green-primary;
    font-weight: 500;
    text-decoration: underline;
  }
}
</style>
