<template lang="pug">
  .landing
    .esgHero.no-repeat.cover
      esg-navbar.flex.flex-column
        .flex.flex-column.flex-auto
          .esgHero__main.flex-auto.flex.flex-column.items-center.justify-center
            h1.fw6.tc {{meta.TITLE}}
            .esgHero__desp
              p(v-for="line in desp" :key="line") {{line}}
            .esgHero__cta.flex.mt5
              menu-item(title="ESG 資料庫" icon="db" route-name="industry-industry")
              menu-item.ml3(title="淨零路徑模擬器" icon="net-zero" route-name="net-zero-industry")
          .flex-none.tr
            a.esgNavbar__officialSite(href="https://thaubing.gcaa.org.tw/")
              img(src="~/assets/logo.png")
    feature-intro(
      title="ESG 資料庫"
      cover-image="esg-db-screenshot.png"
      :desp="meta.ESG_DB_DESP"
      :cta-title="meta.ESG_DB_CTA"
      route-name="industry-industry"
      theme="white"
    )
    feature-intro(
      title="淨零路徑模擬器"
      cover-image="net-zero-screenshot.png"
      :desp="meta.NET_ZERO_DESP"
      :cta-title="meta.NET_ZERO_CTA"
      route-name="net-zero-industry"
    )
    .blog.esgContainer.pv4
      h2.fw5.tc 專欄文章
      .blog__list.mv4.mt5-ns
        article-summary(
          v-for="article in articles"
          :key="article.path"
          :article="article"
          :tagMeta="tagDefs"
          header-tag="h3"
        )
    .esgContainer
      gcaa-footer
</template>
<script>
import { friendlyHeader } from '~/libs/crawlerFriendly'
import landingMeta from '~/static/content/meta/landing.json'

export default {
  layout: 'empty',
  async asyncData ({ $content, params, redirect }) {
    const articles = await $content('blog')
      .where({
        wip: false
      })
      .sortBy('creationDate', 'desc')
      .only(['title', 'coverImage', 'tags', 'creationDate', 'slug'])
      .limit(3)
      .fetch()

    const tagDefs = await $content('settings')
      .where({ type: 'blogTags' })
      .only(['tagEn', 'tagZh'])
      .fetch()

    return { articles, tagDefs }
  },
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
    min-height: 55rem;
    height: 90vh;
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

  &__cta {
    .menuItem {
      border-radius: 0.875rem;
    }
  }
}

.blog {
  h2 {
    font-size: 1.5rem;
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
      grid-template-columns: repeat(auto-fit, 19vw);
      column-gap: 1.5rem;
      row-gap: 2.625rem;
      justify-content: center;
    }
  }
}
</style>
