<template>
  <div class="login-user login-user--login">
    <BaseButton class-name="base-button--bg-red base-button--user-login" @click="gotoAccount">CÁ NHÂN</BaseButton>
    <BaseButton class-name="base-button--bg-red base-button--user-login">GIỎ HÀNG</BaseButton>
  </div>
</template>

<script>

import BaseButton from '~common/base-button'

export default {
  components: {
    BaseButton
  },
	methods:{
		gotoAccount() {
			this.$router.push('/account')
		}
	}
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/header/login-user.scss">
</style>
