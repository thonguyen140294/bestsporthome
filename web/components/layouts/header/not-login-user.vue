<template>
  <div class="not-login-user">
    <BaseButton v-b-modal.modalRegister class-name="base-button--bg-red base-button--user-login">ĐĂNG KÝ NGAY</BaseButton>
    <BaseButton v-b-modal.modalLogin class-name="base-button--bg-red base-button--user-login">ĐĂNG NHẬP</BaseButton>
  </div>
</template>

<script>
import BaseButton from '~common/base-button'

export default {
  components: {
    BaseButton
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/header/not-login-user.scss">
</style>
