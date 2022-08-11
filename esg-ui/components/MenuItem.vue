<template lang="pug">
  nuxt-link.menuItem.flex.items-center(:to="to")
    img.menuItem__icon.mr2(:src="iconPath" :alt="title")
    | {{title}}
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    routeName: {
      type: String,
      required: true
    }
  },
  computed: {
    to () {
      let industry = this.$route.params.industry
      if (!industry) {
        industry = this.$store.state.company.上市上櫃產業編碼
      }
      return {
        name: this.routeName,
        params: {
          industry
        }
      }
    },
    isActive () {
      return this.$route.name === this.routeName
    },
    iconPath () {
      const postfix = this.isActive ? '-active' : '-default'
      return `/logo/${this.icon}${postfix}.svg`
    }
  }
}
</script>
<style lang="scss" scoped>
.menuItem {
  background: #EBEDEB80;
  border-top-left-radius: 0.875rem;
  border-top-right-radius: 0.875rem;
  padding: 0.375rem 1rem;

  font-size: 1.625rem;
  line-height: 1.5;
  color: #fff;

  &__icon {
    height: 1.75rem;
    width: 1.75rem;
  }

  &.nuxt-link-active {
    background: #EBEDEB;
    color: #1F231E;
  }

  &:not(:last-child) {
    margin-right: 0.375rem;
  }
}
</style>
