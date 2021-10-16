<template lang="pug">
  .footer.bt.bw1.mv3.pv3.flex-ns.justify-between.tc.tl-ns
    .mid-gray
      | 由
      a.dim(href="http://www.gcaa.org.tw/") 綠色公民行動聯盟
      | &nbsp;X&nbsp;
      a.dim(href="https://thaubing.gcaa.org.tw/") 透明足跡計畫
      | 推動
    .mid-gray.mt3.mt0-ns
      a.dim(href="https://github.com/gcaa-org-tw/thaubing-esg") 原始碼
      | &nbsp;X&nbsp;
      a.dim(href="https://github.com/gcaa-org-tw/thaubing-esg/tree/main/data") 資料
      | &nbsp; 以開放授權 MIT / CC-BY 4.0 釋出
</template>
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
