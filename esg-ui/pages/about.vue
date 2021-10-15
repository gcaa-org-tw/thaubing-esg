<template lang="pug">
  .about
    .about__nav.pv3.no-repeat.cover.relative
      .mw8.flex.justify-between.center
        nuxt-link.f3.fw5.white(to="/") ESG 檢測儀
        a.about__officialSite(href="https://thaubing.gcaa.org.tw/")
          img(src="~/assets/logo.png")
      h1.fw6.white.tc.f2 關於計畫
    .mw7.center.mv5.ph3
      nuxt-content(:document="page")
</template>
<script>
import { friendlyHeader } from '~/libs/crawlerFriendly'
export default {
  async asyncData ({ $content, params, redirect }) {
    const page = await $content('about').fetch()
    return {
      page
    }
  },
  head: friendlyHeader({
    title: '關於'
  })
}
</script>
<style lang="scss" scoped>
.about {
  &__nav {
    background-image: url('~/assets/tree-bg.png');
  }
}
</style>
