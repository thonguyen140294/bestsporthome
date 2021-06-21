<template>
  <div class="bottom-bar-content">
    <div class="bottom-bar-content__icn">
      <img :src="item.imgSrc" :alt="item.alt" class="bottom-bar-content__img">
    </div>
    <p class="bottom-bar-content__text">{{ item.title }}</p>
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

<style lang="scss" scoped src="~scssAsset/common/bottom-bar-content.scss"></style>
