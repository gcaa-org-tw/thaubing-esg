<template lang="pug">
  .gcaaEsg.pb3
    esg-navbar
    nuxt
</template>
<script>
import Konami from 'konami'

export default {
  data () {
    return {
      konamiHandler: null
    }
  },
  mounted () {
    this.konamiHandler = new Konami(() => { this.toggleGuanshiyinn() })
  },
  beforeDestroy () {
    if (this.konamiHandler) {
      this.konamiHandler.unload()
    }
  },
  methods: {
    toggleGuanshiyinn () {
      this.$store.commit('setGuanshiyinn', !this.$store.state.isGuanshiyinn)
    }
  }
}
</script>
<style lang="scss">
body {
  background: #EBEDEB;
}
</style>
