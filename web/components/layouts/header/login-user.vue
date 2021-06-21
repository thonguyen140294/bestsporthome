<template>
  <div class="login-user login-user--login">
    <BaseButton class-name="base-button--bg-red base-button--user-login">CÁ NHÂN</BaseButton>
    <BaseButton class-name="base-button--outline-white base-button--user-login">GIỎ HÀNG</BaseButton>
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

<style scoped lang="scss" src="~scssAsset/layouts/header/login-user.scss">
</style>
