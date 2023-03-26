<template lang="pug">
  .blog
    esg-navbar.flex.flex-column
      .flex.flex-column.flex-auto
        .esgHero__main.flex-auto.flex.flex-column.items-center.justify-center
          h1.fw6.tc 專欄文章
        .flex-none.tr
          a.esgNavbar__officialSite(href="https://thaubing.gcaa.org.tw/")
            img(src="~/assets/logo.png")
    .esgContainer
      .blog__list.mv4.mt5-ns
        article-summary(
          v-for="article in articles"
          :key="article.path"
          :article="article"
          :tagMeta="tagDefs"
        )
    .esgContainer
      gcaa-footer
</template>
<script>
export default {
  layout: 'empty',
  async asyncData ({ $content, params, redirect }) {
    const articles = await $content('blog')
      .where({
        wip: false
      })
      .sortBy('creationDate', 'desc')
      .only(['title', 'coverImage', 'tags', 'creationDate'])
      .fetch()

    const tagDefs = await $content('settings')
      .where({ type: 'blogTags' })
      .only(['tagEn', 'tagZh'])
      .fetch()

    return { articles, tagDefs }
  }
}
</script>
<style lang="scss" scoped>
.blog {
  .esgNavbar {
    padding-bottom: 1rem;
  }

  &__list {
    .articleSum + .articleSum {
      margin-top: 1rem;
    }
  }

  @include ns-screen {
    &__list {
      .articleSum + .articleSum {
        margin-top: 0;
      }
      display: grid;
      grid-template-columns: repeat(auto-fill, 19vw);
      column-gap: 1.5rem;
      row-gap: 2.625rem;
      justify-content: center;
    }
  }
}
</style>
