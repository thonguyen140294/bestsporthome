<template>
  <header id="header" class="header">
    <div class="container">
      <div class="justify-content-md-center text-center row">
        <div class="col-sm-2">
          <Logo />
        </div>
        <div class="col-sm-7">
          <form class="header-search-form">
            <input type="text" placeholder="Tìm ....">
            <button><BIconSearch icon="search" /></button>
          </form>
        </div>
        <div class="col-sm-3">
          <div class="header__user">
            <LoginUser v-show="isLogged" />
            <NotLoginUser v-show="!isLogged" />
          </div>
        </div>
      </div>
    </div>
    <Menu />
  </header>
</template>

<script>
import { BIconSearch } from 'bootstrap-vue'
import LoginUser from './login-user'
import NotLoginUser from './not-login-user'
import Menu from './menu'
import Logo from '~common/logo'

export default {
  components: {
    Logo,
    LoginUser,
    NotLoginUser,
    BIconSearch,
    Menu
  },
  computed: {
    isLogged () {
      return this.$store.getters.isLogged
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/header/index.scss"></style>
