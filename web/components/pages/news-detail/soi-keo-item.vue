<template>
  <div class="soi-keo-item">
    <nuxt-link :to="item.slug" class="soi-keo-item__link">
      <img :src="require('~imageAsset/pages/news-detail/icn-arrow-red.svg')" alt="">
      <span>{{ item.title }}</span>
    </nuxt-link>
  </div>
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

<style scoped lang="scss" src="~scssAsset/pages/news-detail/soi-keo-item.scss"></style>
