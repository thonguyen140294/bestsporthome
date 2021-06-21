<template>
  <img :src="item.src" :alt="item.alt" loading="lazy">
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

<style scoped lang="scss" src="">
</style>
