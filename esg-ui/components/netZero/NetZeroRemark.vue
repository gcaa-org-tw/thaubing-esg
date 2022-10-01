<template lang="pug">
  dl.nzRemark.f6
    .nzRemark__item.lh-copy(v-for="field in fieldList" :key="field.key")
      div
        dt.di.fw5 {{field.title}}
        span ：
      dd
        template(v-for="(token, i) in field.remark")
          a(v-if="token.tag === 'a'" :href="token.href" target="_blank" rel="noopener") {{token.text}}
          span(v-else) {{token.text}}
</template>
<script>
import netZeroMeta from '~/static/content/meta/net-zero-meta.json'

export default {
  props: {
    fields: {
      type: Array,
      default () {
        return ['BASE_YEAR']
      },
      validator (val) {
        return Array.isArray(val) && val.every(key => netZeroMeta[key])
      }
    }
  },
  computed: {
    fieldList () {
      return this.fields.map((field, i) => {
        return {
          key: `${field}-${i}`,
          title: netZeroMeta[`${field}_TITLE`],
          remark: this.parseRemark(netZeroMeta[field])
        }
      })
    }
  },
  methods: {
    parseRemark (line) {
      // find a link w/ markdown syntax
      const matchTokens = line.match(/([^[]+)\[([^\]]+)\]\(([^)]+)\)(.*)/)
      if (!matchTokens) {
        return [{ tag: 'span', text: line }]
      } else {
        return [
          { tag: 'span', text: matchTokens[1] },
          { tag: 'a', text: matchTokens[2], href: matchTokens[3] },
          ...this.parseRemark(matchTokens[4])
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.nzRemark {
  &__item {
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
