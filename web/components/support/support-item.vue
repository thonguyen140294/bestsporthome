<template>
  <a class="support-item" :href="item.link">
    <img :src="item.src" :alt="item.type">
    <p class="support-item__text" :class="[`support-item__text--${item.type}`]">{{ item.title }}: </p>
    <p class="support-item__phone">{{ item.phone }}</p>
  </a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/support/support-item.scss">
</style>
