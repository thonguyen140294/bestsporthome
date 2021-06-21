<template>
  <div class="wrapper-title">
    <h4 v-if="title">{{ title }}</h4>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/account/wrapper-title.scss">
</style>
