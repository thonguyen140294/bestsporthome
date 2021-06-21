<template>
  <div class="wrapper-account">
    <div class="wrapper-account__title">
      <a href="#" class="wrapper-account__cta-back" @click.prevent="$emit('back', isBase)">
        <img :src="require('~imageRoot/icons/back.svg')" alt="back">
      </a>
      <h3 class="wrapper-account__hdg">{{ title }}</h3>
    </div>
    <div class="wrapper-account__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'TÀI KHOẢN'
    },
    isBase: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/account/sp/wrapper-account.scss"></style>
