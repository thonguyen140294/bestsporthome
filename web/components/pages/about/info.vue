<template>
  <div class="about-info">
    <h4 :class="['about-info__heading', classHeader]">
      <slot name="header" />
    </h4>
    <div :class="['about-info__content', classBody]">
      <slot name="body" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    classHeader: {
      type: String,
      default: ''
    },
    classBody: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" src="~scssAsset/pages/about/info.scss">
</style>
