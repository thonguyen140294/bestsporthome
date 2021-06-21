<template>
  <div class="user-login-section">
    <div class="user-login-section__user">
      <Logo class="logo--panel" />
      <a href="javascript:void(0)" class="user-login-section__user__info" @click="redirectToAccount">
        <img :src="require(`~imageAsset/layouts/header/login-user/avatar${currentUser.avatar || 0}.png`)" alt="">
        <p class="">
          <span>{{ currentUserFullName }}</span>
          <b class="money-main">{{ globalMainBalance | formatAmountUnit(1) }} Đ</b>
        </p>
      </a>
      <a href="javascript:void(0)" class="user-login-section__arrow" @click="redirectToAccount">
        <img :src="require('~imageRoot/icons/icon-arrow.svg')" alt="">
      </a>
    </div>
    <div class="user-login-section___cta">
      <BaseButton
        class-name="base-button--menu base-button--bg-yellow"
        @click="redirectToAccount(true)"
      >
        NẠP - RÚT TIỀN
      </BaseButton>
      <BaseButton
        class-name="base-button--outline-white base-button--menu"
        @click="handleClickTransfer"
      >
        QUẢN LÝ VÍ
      </BaseButton>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import globalMixin from '~/mixins/global-mixin'
import Logo from '~common/logo'
import BaseButton from '~common/base-button'
import modalMixin from '~/mixins/user/modal'
import maintenanceMixin from '~/mixins/maintenance'
import navigateMixin from '~/mixins/navigation'
import { MODAL } from '~/config/constant'

export default {
  components: {
    Logo,
    BaseButton
  },
  mixins: [globalMixin, modalMixin, maintenanceMixin, navigateMixin],
  data () {
    return {
      modal: MODAL
    }
  },
  methods: {
    handleClickTransfer () {
      this.$_modalMixin_closeAllModal()
      if (!this.$_maintainMixin_checkWalletMaintain(
        this.$store.state.maintenance.maintenance.startTime,
        this.$store.state.maintenance.maintenance.endTime
      )) {
        this.$store.commit('maintenance/setShowWalletMaintenance', false)
        this.$nextTick(() => {
          const bottomBar = $('.bottom-bar')
          bottomBar.addClass('active')
          $('.bottom-bar-item.wallet')[0].classList.add('active')
        })
        this.$_modalMixin_openModal(this.modal.TRANSFER_WALLET)
      }
    },
    redirectToAccount (mainWallet = false) {
      const currentRouter = this.$router.currentRoute.fullPath
      if (currentRouter === '/account') {
        this.$_modalMixin_closeAllModal()
        return
      }
      this.$_navigationMixin_navigate('/account', false, false, mainWallet)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/menu-panel/user-login-section.scss"></style>
