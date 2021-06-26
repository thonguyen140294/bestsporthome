import { mapState } from 'vuex'
import { isValidURL } from '@/helper'
import modalMixin from '~/mixins/user/modal'
import panelMenuMixin from '~/mixins/panel-menu'
import maintenanceMixin from '~/mixins/maintenance'
import { MODAL } from '~/config/constant'

export default {
  mixins: [modalMixin, panelMenuMixin, maintenanceMixin],
  methods: {
    async $_navigationMixin_navigate (url, loginRequired = false, newTab = false, mainWallet = false) {
      if (loginRequired && this.currentUser === null) {
        this.$_modalMixin_closeAllModal()
        this.$_panelMenuMixin_reset()
        this.$_modalMixin_openModal(MODAL.LOGIN)
        return
      }

      // If click on main wallet game and in maintain time, show popup
      if (mainWallet && this.$_maintainMixin_checkMainWalletGame()) {
        return
      }
      if (!url) {
        return
      }
      if (newTab) {
        newTab = window.open('', '_blank')
        if (isValidURL(url)) {
          newTab.location.href = url
          return
        }
        const response = await this.$axios.$get(this.$_iframeGameMixin_mapGameApi(url) || url, {
          params: {
            isMobile: this.$device.isMobileOrTablet
          }
        })
        const urlResponse = response?.data?.url
        if (urlResponse) {
          newTab.location.href = urlResponse
        } else {
          newTab.close()
        }
        return
      }
      this.$router.push(url)
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
