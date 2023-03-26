 <template lang="pug">
  .esgNavbar.esgContainer.pt3.relative.no-repeat.cover(:class="{pb3: !isGuanshiyinn}")
    .flex.justify-between.items-start
      nuxt-link(to="/")
        template(v-if="isGuanshiyinn")
          .esgNavbar__title ESG 檢測儀
        template(v-else)
          h1.esgNavbar__title.fw7.mt0 ESG 檢測儀
          p.esgNavbar__desp
            | 打造永續環境資料庫，推動企業永續發展。
      .esgNavbar__articles.flex.items-center
        nuxt-link.dn.db-ns.dim(to="/about/") 關於計畫
        nuxt-link.dn.db-ns.dim(to="/blog/") 專欄文章
        nuxt-link.dn.db-ns.dim(to="/terms-of-service/") 免責聲明
        a.esgNavbar__cta.dim.db(href="https://gcaa.neticrm.tw/civicrm/contribute/transact?reset=1&id=41&utm_source=Web&utm_content=ESG_donate&utm_campaign=TB3") 捐款支持
    slot
      a.esgNavbar__officialSite.absolute(href="https://thaubing.gcaa.org.tw/")
        img(src="~/assets/logo.png")
      .esgNavbar__toolbar.flex.relative(v-if="isGuanshiyinn")
        .esgMenu
          .esgMenu__item.flex
            menu-item(title="ESG 資料庫" icon="db" route-name="industry-industry")
            menu-item(title="淨零路徑模擬器" icon="net-zero" route-name="net-zero-industry")
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({ isReallyGuanshiyinn: 'isGuanshiyinn' }),
    isGuanshiyinn () {
      return true
    }
  }
}
</script>
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
    right: var(--screen-space);
    bottom: 1rem;
  }

  &__articles {
    a {
      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }

  a.esgNavbar__cta {
    color: #49591C;
    line-height: 1.5;
    padding: 0.125rem 0.5rem;
    background: #EBEDEB;
    border-radius: 0.125rem;
  }

  &__toolbar {
    margin-top: 3.5rem;
  }
}
</style>
