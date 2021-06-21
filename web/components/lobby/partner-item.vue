<template>
  <div class="partner-item">
    <img :src="item.imageSrc" :alt="item.alt">
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/partner-item.scss"></style>
