<template lang="pug">
  .blogArticle
    esg-navbar
      .pb3
    .blogArticle__article.mv4.mv5-ns.center
      h1.fw5.f3.f2-ns.lh-title {{article.title}}
      .blogArticle__meta.flex.f6
        .blogArticle__tag.mr2(v-for="tag in tagList" :key="tag") {{tag}}
        .blogArticle__date {{date}}
      nuxt-content.black(:document="article")
    .esgContainer
        gcaa-footer
</template>
<script>
import dayjs from 'dayjs'
import { getZhTags } from '~/libs/utils'
import { friendlyHeader } from '~/libs/crawlerFriendly'

export default {
  layout: 'empty',
  async asyncData ({ $content, params, redirect }) {
    const article = await $content('blog', params.blog)
      .where({
        wip: false
      })
      .fetch()

    const tagDefs = await $content('settings')
      .where({ type: 'blogTags' })
      .only(['tagEn', 'tagZh'])
      .fetch()

    return { article, tagDefs }
  },
  head: friendlyHeader({
    title () {
      return this.article.title
    },
    description () {
      return this.article.description
    },
    coverUrl () {
      return this.article.coverImage || '/og-default.jpg'
    }
  }),
  computed: {
    tagList () {
      return getZhTags(this.article.tags || [], this.tagDefs)
    },
    date () {
      return dayjs(this.article.creationDate).format('YYYY年MM月DD日')
    }
  }
}
</script>
<style lang="scss" scoped>
.blogArticle {
  &__article {
    padding: 0 1rem;
    width: 100%;
    max-width: 45rem;
  }

  h1 {
    color: $green-primary;
  }

  &__meta {
    margin: 1rem 0 1.75rem;
  }

  &__tag {
    color: $green-secondary;
  }

  &__date {
    color: #444;
  }

  .nuxt-content ::v-deep() {
    line-height: 1.5;
    font-size: 1.125rem;

    p, img, ul, li {
     + p, img, ul, li {
      margin-top: 1rem;
     }
    }

    a {
      color: $green-secondary;
    }
  }
}
</style>
