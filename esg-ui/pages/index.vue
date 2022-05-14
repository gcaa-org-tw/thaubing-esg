<template lang="pug">
  .index
</template>
<script>
export default {
  middleware ({ redirect }) {
    // goto 石化 by default
    // we can't use non-ascii in url due to nuxt hydration bug
    return redirect('/industry/03/')
  }
}
</script>
