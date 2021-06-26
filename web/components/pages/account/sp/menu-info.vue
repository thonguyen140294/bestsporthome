<template>
  <div>
    <div v-if="currentUser" class="menu-info">
      <div class="menu-info__wrap">
        <div class="menu-info__user">
          <p class="menu-info__avatar">
            <img v-if="imageAvatar" class="menu-info__avatar-icon" :src="avatarIcon" alt="Avatar">
            <img :src="imageAvatar" alt="avatar">
          </p>
          <div class="overflow-hidden">
            Welcome
            <b>{{ currentUserFullName }}</b>
          </div>
        </div>
        <div class="menu-info__detail">
          <ul class="nav">
            <li v-for="item in navLinks" :key="item.title" class="nav-item">
              <nuxt-link class="nav-link" :to="item.link">{{ item.title }}</nuxt-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click.prevent="$_logoutMixin_logout()">Đăng xuất</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import logoutMixin from '~/mixins/user/logout'
import navigationMixin from '~/mixins/navigation'

export default {
  mixins: [logoutMixin, navigationMixin],
  props: {
    activeTab: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      navLinks: [
        {
          title: 'Thông tin cá nhân',
          link: '/account?tab=account-info&type=info-personal',
          tab: 0,
          sub: 0
        },
        {
          title: 'Lịch sử giao dịch',
          link: '/account?tab=history-transaction',
          tab: 1
        },
      ]
    }
  },
  computed: {
    ...mapState(['currentUser']),
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/pages/account/sp/menu-info.scss"></style>
