<template>
  <div class="menu-category">
    <div class="menu-category__wrap">
      <ul class="nav">
        <li v-for="item in categories" :key="item.title" class="nav-item">
          <nuxt-link class="nav-link" :to="item.link" :class="{ active: $route.query.tab === item.tab }">{{ item.title }}</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="menu-category__wrap">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="$_logoutMixin_logout()">Đăng xuất</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import logoutMixin from '~/mixins/user/logout'

export default {
  mixins: [logoutMixin],
  data () {
    return {
      categories: [
        { title: 'Thông tin tài khoản', link: '/account?tab=account-info', tab: 'account-info' },
        { title: 'Lịch sử giao dịch', link: '/account?tab=history-transaction', tab: 'history-transaction' },
        { title: 'Lịch sử chơi game', link: '/account?tab=history-betting', tab: 'history-betting' }
      ]
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/account/menu-category.scss"></style>
