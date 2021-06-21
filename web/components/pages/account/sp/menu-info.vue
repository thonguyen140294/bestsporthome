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
        <div class="menu-info__wallet">
          <p>
            <span>Ví C</span>
            <b class="money-main">{{ globalMainBalance || 0 | formatAmountUnit(1) }} Đ</b>
          </p>
          <p>
            <span>Ví P</span>
            <b class="money-sub">{{ globalSubBalance || 0 | formatAmountUnit(1) }} Đ</b>
          </p>
        </div>
        <div class="menu-info__pay">
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link" @click="depositWallet" :class="{ active: activeTab === 0 }">
                <img :src="require('~imageRoot/icons/deposit.svg')" alt="deposit">
                NẠP TIỀN
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="withdrawWallet" :class="{ active: activeTab === 1 }">
                <img :src="require('~imageRoot/icons/withdraw.svg')" alt="withdraw">
                RÚT TIỀN
              </a>
            </li>
          </ul>
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
      <div class="menu-info__plan" v-if="promotion && promotion.plan">
        <div class="menu-info__plan__content">
          <PreferentialPackage />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import logoutMixin from '~/mixins/user/logout'
import navigationMixin from '~/mixins/navigation'
import PreferentialPackage from '~account/preferential-package'
import { AVATAR_ICON } from '~/config/constant'

export default {
  components: {
    PreferentialPackage
  },
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
          tab: 2,
          sub: 0
        },
        {
          title: 'Thông tin ngân hàng',
          link: '/account?tab=account-info&type=info-bank',
          tab: 2,
          sub: 1
        },
        {
          title: 'Lịch sử giao dịch',
          link: '/account?tab=history-transaction',
          tab: 3
        },
        {
          title: 'Lịch sử cá cược',
          link: '/account?tab=history-betting&type=betting',
          tab: 4
        },
        {
          title: 'Lịch sử Game ví phụ',
          link: 'account?tab=history-betting&type=sport',
          tab: 4
        }
      ]
    }
  },
  computed: {
    ...mapState(['currentUser', 'promotion']),
    avatarIcon () {
      return this.currentUser.hasBank ? AVATAR_ICON.SUCCESS : AVATAR_ICON.WARNING
    },
    imageAvatar () {
      return this.$store.getters.imageAvatar
    }
  },
  methods: {
    depositWallet () {
      this.$_navigationMixin_navigate('/account?tab=deposit', false, false, true)
    },
    withdrawWallet () {
      this.$_navigationMixin_navigate('/account?tab=withdraw', false, false, true)
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/pages/account/sp/menu-info.scss"></style>
