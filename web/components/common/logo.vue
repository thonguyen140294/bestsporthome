<template>
  <a href="/" aria-label="Logo" @click.prevent="$_navigationMixin_navigate('/', false, false)">
    <img :src="require('~imageAsset/common/logo/logo.png')" alt="LOGO">
  </a>
</template>

<script>
import navigateMixin from '~/mixins/navigation'

export default {
  mixins: [navigateMixin]
}
</script>

<style scoped lang="scss" src="~scssAsset/common/logo.scss"></style>
