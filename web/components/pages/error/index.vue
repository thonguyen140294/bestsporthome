<template>
  <section class="error">
    <div class="container">
      <p class="error__img">
        <img :src="require('~imageAsset/pages/404/icn.svg')" alt="">
      </p>
      <h3>KHÔNG TÌM THẤY TRANG</h3>
      <p class="error__text">TRANG ĐÃ BỊ XÓA HOẶC ĐỊA CHỈ URL KHÔNG ĐÚNG</p>
      <BaseButton class-name="base-button--bg-red base-button--error" @click="clickGoHome">VỀ TRANG CHỦ</BaseButton>
    </div>
  </section>
</template>

<script>
import BaseButton from '~common/base-button'
import SimplePage from '~/mixins/simple-page'

export default {
  components: {
    BaseButton
  },
  mixins: [SimplePage],
  methods: {
    clickGoHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/error/index.scss"></style>
