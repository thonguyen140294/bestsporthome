import { IFRAME_GAME_URLS } from '~/config/page-url'
import USER_API from '~/api/user'
import globalMixin from '~/mixins/global-mixin'
import modalMixin from '~/mixins/user/modal'
import promotionMixin from '~/mixins/promotion'
import socketMixin from '~/mixins/socket'
import { isCurrentBetweenStartAndEnd } from '~/helper/maintenance-utils'

export default {
  mixins: [globalMixin, modalMixin, promotionMixin, socketMixin],
  methods: {
    async $_loginMixin_login (lpToken = null, redirect = null) {
      this.$_globalMixin_loading()
      try {
        // Make sure unsubscribe all Wallet and Plan of old user (if any)
        this.unSubscribeWallet()
        this.unSubscribeUserPlan()

        // Setting new data for new User
        let response = null
        if (lpToken) {
          response = await this.$axios.$post(USER_API.LP_TOKEN_LOG_IN, { token: lpToken })
        } else {
          response = await this.$axios.$post(USER_API.LOG_IN, { ...this.formData })
          if (this.formData.saveUsername) {
            this.$store.commit('updateUserName', this.formData.username)
          } else {
            this.$store.commit('updateUserName', '')
          }
        }
        this.$_globalMixin_load()
        response.data.avatar = response.data.avatar || response.data.login_count % 11 + 1
        response.data.hasBank = response.data.banks
        this.$store.commit('currentUser', response.data)
        this.$_promotionMixin_fetchPlan()
        this.$_loginMixin_reset()
        this.$_modalMixin_closeButton()
        this.$_modalMixin_closeModal('modalLogin')
        const wallet = response.data.wallet
        if (wallet) {
          const totalBalance = Math.floor(wallet.balance) + Math.floor(wallet.subBalance) || 0
          this.$store.commit('updateBalance', Math.floor(wallet.balance))
          this.$store.commit('updateSubBalance', Math.floor(wallet.subBalance))
          this.$store.commit('updateTotalBalance', totalBalance)
          const isMaintain = isCurrentBetweenStartAndEnd(
            this.$store.state.maintenance.maintenance.startTime,
            this.$store.state.maintenance.maintenance.endTime
          )
          if (!totalBalance && !isMaintain && !redirect) {
            this.$router.push('/account')
            return
          }
        }
        if (redirect) {
          window.location.href = redirect
        } else if (Object.values(IFRAME_GAME_URLS).includes(this.$getRoute(this.$route).path)) {
          window.location.reload()
        }
      } catch (error) {
        this.$showError({ error })
        this.$_globalMixin_load()
      }
    },
    $_loginMixin_reset () {
      this.formData = {
        username: '',
        password: '',
        saveUsername: 0
      }
    }
  }
}
