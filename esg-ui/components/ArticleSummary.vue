<template lang="pug">
  nuxt-link.articleSum(:to="article.path")
    .aspect-ratio.aspect-ratio--16x9.br2.overflow-hidden.mb2
      img.aspect-ratio--object(:src="coverImage" :alt="article.title")
    .mt2.flex.f6(v-if="tagList.length")
      .articleSum__tag(v-for="tag in tagList" :ke="tag") {{tag}}
    h2.mt1.mb4.f5.f4-ns.fw5.black.lh-title {{article.title}}
    .articleSum__date.f6.lh-copy {{date}}
</template>
<script>
import dayjs from 'dayjs'
import { getZhTags } from '~/libs/utils'
import defaultCover from '~/static/og-default.jpg'

export default {
  props: {
    article: {
      type: Object,
      required: true,
      validator (article) {
        return article.title && article.path && article.creationDate
      }
    },
    tagMeta: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    coverImage () {
      return this.article.comverImage || defaultCover
    },
    tagList () {
      return getZhTags(this.article.tags || [], this.tagMeta)
    },
    date () {
      return dayjs(this.article.creationDate).format('YYYY年MM月DD日')
    }
  }
}
</script>
<style lang="scss" scoped>
.articleSum {
  img {
    object-fit: cover;
  }
  &__tag {
    color: $green-secondary;

    + .articleSum__tag {
      margin-left: 0.5rem;
    }
  }

  &__date {
    color: #444;
  }
}
</style>
