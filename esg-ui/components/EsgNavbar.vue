<template lang="pug">
  .esgNavbar.esgContainer.pv3.relative.no-repeat.cover
    .esgNavbar__about.flex.justify-end
      nuxt-link.mr3.dim(to="/about/") 關於計畫
      nuxt-link.dim(to="/terms-of-service/") 免責聲明
    nuxt-link(to="/")
      h1.esgNavbar__title.fw7 ESG 檢測儀
    p.esgNavbar__desp
      | 打造永續環境資料庫，推動企業永續發展。
    a.esgNavbar__officialSite.absolute(href="https://thaubing.gcaa.org.tw/")
      img(src="~/assets/logo.png")
</template>
<style lang="scss" scoped>
.esgNavbar {
  background-image: url('~/assets/tree-bg.webp');
  color: white;
  line-height: 1.4;
  a {
    color: white;
  }

  &__desp {
    font-size: 1.5rem;
    margin: 1rem 0 1.75rem;
  }
  &__officialSite {
    right: 1.5rem;
    bottom: 1rem;
  }
}
</style>
