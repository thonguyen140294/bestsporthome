<template>
  <section>
    <div v-if="currentUser" class="menu-info">
      <div class="menu-info__user">
        <div class="menu-info__avatar">
          <img v-if="imageAvatar" class="menu-info__avatar-icon" :src="avatarIcon" alt="Avatar">
          <img :src="imageAvatar" alt="avatar">
        </div>
        <div class="overflow-hidden">
          Welcome
          <b>{{ currentUserFullName }}</b>
        </div>
      </div>
      <div class="menu-info__wrap">
        <div class="menu-info__wallet">
          <p>
            <span>Ví Chính</span>
            <b class="money-main">{{ globalMainBalance || 0 | formatAmountUnit(1) }} Đ</b>
          </p>
          <p>
            <span>Ví Phụ</span>
            <b class="money-sub">{{ globalSubBalance || 0 | formatAmountUnit(1) }} Đ</b>
          </p>
        </div>
        <div class="menu-info__transfer" tabindex="0" @focusout="checkShowTransfer">
          <i class="transfer-btn" @click="showTransfer()" />
          <div v-if="isShowTransfer" class="transfer-wrap">
            <img class="transfer-wrap__close" :src="require(`~imageRoot/icons/transfer-close.svg`)" alt="transfer-close" @click.stop="closeTransfer()">
            <WalletTransfer />
          </div>
        </div>
      </div>
      <div class="menu-info__pay">
        <ul id="menuPay" class="nav">
          <li class="nav-item" :class="{ active: $route.query.tab === 'deposit' }">
            <a class="nav-link" @click="depositWallet">
              <img :src="require('~imageRoot/icons/deposit.svg')" alt="deposit">
              NẠP TIỀN
            </a>
          </li>
          <li class="nav-item" :class="{ active: $route.query.tab === 'withdraw' }">
            <a class="nav-link" @click="withdrawWallet">
              <img :src="require('~imageRoot/icons/withdraw.svg')" alt="withdraw">
              RÚT TIỀN
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>

import globalMixin from '~/mixins/global-mixin'
import maintenanceMixin from '~/mixins/maintenance'
import navigationMixin from '~/mixins/navigation'
import WalletTransfer from '~account/wallet-transfer'
import { AVATAR_ICON } from '~/config/constant'

export default {
  components: {
    WalletTransfer
  },
  mixins: [globalMixin, maintenanceMixin, navigationMixin],
  data () {
    return {
      isShowTransfer: false
    }
  },
  computed: {
    avatarIcon () {
      return this.currentUser.hasBank ? AVATAR_ICON.SUCCESS : AVATAR_ICON.WARNING
    }
  },
  methods: {
    closeTransfer () {
      this.isShowTransfer = false
    },
    checkShowTransfer () {
      if (this.isShowTransfer) {
        this.isShowTransfer = false
      }
    },
    showTransfer () {
      if (!this.$_maintainMixin_checkWalletMaintain(
        this.$store.state.maintenance.maintenance.startTime,
        this.$store.state.maintenance.maintenance.endTime
      )) {
        this.$store.commit('maintenance/setShowWalletMaintenance', false)
        this.isShowTransfer = !this.isShowTransfer
      }
    },
    depositWallet () {
      this.$_navigationMixin_navigate('/account?tab=deposit', false, false, true)
    },
    withdrawWallet () {
      this.$_navigationMixin_navigate('/account?tab=withdraw', false, false, true)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/account/menu-info.scss">
</style>
