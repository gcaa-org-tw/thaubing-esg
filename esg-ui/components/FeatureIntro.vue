<template lang="pug">
  .feat.flex-ns.items-center.esgContainer.pv4.pv6-ns(:class="[`feat--${theme}`]")
    .feat__cover.mr4-ns
      .aspect-ratio.aspect-ratio--16x9
        img(:src="cover" :alt="title")
    .feat__content.mt4.mt0-ns
      h2.fw6.f3.mv0 {{title}}
      .feat__desp.mv4.lh-copy
        p(v-for="(line, i) in despLines" :key="i") {{line}}
      .tr
        nuxt-link.feat__cta.f4.fw6.br-pill.inline-flex.items-center.pv3.ph4(:to="to")
          | {{ctaTitle}}
          i.fas.fa-arrow-right.ml2
</template>
<script>
export default {
  props: {
    coverImage: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    desp: {
      type: String,
      required: true
    },
    ctaTitle: {
      type: String,
      required: true
    },
    routeName: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  computed: {
    cover () {
      return require(`~/assets/imgs/${this.coverImage}`)
    },
    despLines () {
      return this.desp.split('\n')
    },
    to () {
      // default 石化業
      const industry = '03'
      return {
        name: this.routeName,
        params: {
          industry
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.feat {
  &--light {
    background: #fff;
  }
  &__cta {
    color: white;
    background: $green-primary;
  }
  &__desp {
    p + p {
      margin-top: 0.75rem;
    }
  }
  @include ns-screen {
    &__cover {
      max-width: 50vw;
    }
  }
}
</style>
