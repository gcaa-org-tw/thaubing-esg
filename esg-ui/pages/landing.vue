<template lang="pug">
  .landing
    .esgHero.no-repeat.cover
      esg-navbar.flex.flex-column
        .flex.flex-column.flex-auto
          .esgHero__main.flex-auto.flex.flex-column.items-center.justify-center
            h1.fw6.tc {{meta.TITLE}}
            .esgHero__desp
              p(v-for="line in desp" :key="line") {{line}}
          .flex-none.tr
            a.esgNavbar__officialSite(href="https://thaubing.gcaa.org.tw/")
              img(src="~/assets/logo.png")
</template>
<script>
import { friendlyHeader } from '~/libs/crawlerFriendly'
import landingMeta from '~/static/content/meta/landing.json'

export default {
  layout: 'empty',
  // async asyncData ({ $content, params, redirect }) {
  //   const meta = await $content('meta/landing').fetch()
  //   return { meta }
  // },
  head: friendlyHeader({
    title: landingMeta.TITLE,
    description: landingMeta.DESP
  }),
  computed: {
    meta () {
      return landingMeta
    },
    desp () {
      return landingMeta.DESP.split('\n')
    }
  }
}
</script>
<style lang="scss" scoped>
.landing {
}
.esgHero {
  background-image: url('~/assets/tree-bg.webp');

  .esgNavbar {
    padding-bottom: 1rem;
    background: transparent;
    backdrop-filter: saturate(80%) blur(0.75rem);
    min-height: 50rem;
    max-height: 100vh;
  }

  h1 {
    font-size: 4rem;
  }

  &__desp {
    font-size: 1.5rem;
    line-height: 1.5;
    width: 90%;
    max-width: 40rem;

    p + p {
      margin-top: 1rem;
    }
  }
}
</style>
