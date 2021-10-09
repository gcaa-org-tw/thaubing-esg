<template lang="pug">
  .about.mw8.center.mv5
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
