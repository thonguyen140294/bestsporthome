<template>
  <div>
    <div id="page" class="page hide">
      <div>
        <TheHeader />
        <div class="content-body">
          <nuxt />
        </div>
        <TheFooter />
        <BottomBar @eventClick="handleBottemBarClick" />
        <client-only>
          <MenuPanel />
          <LoginFrom />
          <RegisterFrom />
          <ForgotPasswordFrom />
          <ModalClose />
        </client-only>
      </div>
    </div>
    <div ref="scrollBtn" class="scroll-top" @click="$_clickScrollToTop()">
      <img :src="require('~imageRoot/icons/scroll-to-top.svg')" alt="scroll-to-top">
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { MODAL } from '@/config/constant'
import isEmpty from 'lodash/isEmpty'
import panelMenuMixin from '~/mixins/panel-menu'
import TheHeader from '~layouts/header'
import BottomBar from '~common/bottom-bar'
import MenuPanel from '~layouts/menu-panel'
import LoginFrom from '~user/login-form'
import RegisterFrom from '~user/register-form'
import ForgotPasswordFrom from '~user/forgot-password-form'
import socketMixin from '~/mixins/socket'
import showLoginMixin from '~/mixins/user/show-login'
import globalMixin from '~/mixins/global-mixin'
import modalMixin from '~/mixins/user/modal'
import maintenanceMixin from '~/mixins/maintenance'
import lpTokenLoginMixin from '~/mixins/user/lptoken-login'
import scrollToTopMixin from '~/mixins/scroll-to-top'
import ModalClose from '~common/modal-close'
import { META_TITLES } from '~/resources/meta-titles'

export default {
  components: {
    TheHeader,
    TheFooter: () => import('~layouts/footer'),
    BottomBar,
    MenuPanel,
    LoginFrom,
    RegisterFrom,
    ForgotPasswordFrom,
    ModalClose
  },
  mixins: [
    globalMixin,
    modalMixin,
    panelMenuMixin,
    socketMixin,
    showLoginMixin,
    scrollToTopMixin,
    maintenanceMixin,
    lpTokenLoginMixin
  ],
  computed: {
    ...mapState({
      showMaintenance: 'maintenance/showMaintenance',
      currentUser: 'currentUser'
    })
  },
  mounted () {
    const self = this
    window.onpopstate = function (event) {
      const countModal = event.currentTarget.document.body.getAttribute('data-modal-open-count')
      if (countModal > 0) {
        self.$_modalMixin_closeAllModal()
        window.history.pushState({}, null, '')
      } else if (!isEmpty(event.state)) {
        const createEvent = new CustomEvent(event.state > 0 ? 'next' : 'previous', { bubbles: true, cancelable: true })
        this.dispatchEvent(createEvent)
      }
    }
  },
  methods: {
    handleBottemBarClick (bottomObj) {
      if (bottomObj.item.modalId === MODAL.NAVIGATION) {
        window.history.pushState({}, null, null)
      }
      if (bottomObj.item.id === 'wallet') {
        if (!this.$_maintainMixin_checkWalletMaintain(
          this.$store.state.maintenance.maintenance.startTime,
          this.$store.state.maintenance.maintenance.endTime
        )) {
          this.$store.commit('maintenance/setShowWalletMaintenance', false)
          this.showBottomModal(bottomObj)
        }
      } else {
        this.showBottomModal(bottomObj)
      }
    },
    showBottomModal ({ item, refs }) {
      const bottomBar = refs.bottomBar?.classList ?? []
      if (bottomBar.length !== 0) {
        bottomBar.add('active')
        if (item.modalId) {
          if (parseInt(this.countModalData) !== 0) {
            this.$_modalMixin_closeExceptModal(item.modalId)
          }
          this.$_modalMixin_toggleModal(item.modalId)
        }
        setTimeout(() => {
          this.countModalData = document.body.getAttribute('data-modal-open-count')
          if (parseInt(this.countModalData) === 1) {
            bottomBar.add('active')
            refs[item.id][0].$el.classList.add('active')
          } else {
            refs[item.id][0].$el.classList.remove('active')
          }
          if (item.link) {
            bottomBar.add('active')
            if (!item.newTab) {
              refs[item.id][0].$el.classList.add('active')
            }
          }
        }, 300)
      }
    },
    showTitleHead (tabActive = '') {
      const liveChatScript = this.$device.isDesktop ? {
        script: [
          {
            src: '/js/live-chat.js'
          }
        ]
      } : {}
      const nameRoute = this.$getRoute(this.$route).name
      if (tabActive) {
        return {
          ...liveChatScript,
          title: META_TITLES[nameRoute?.replace(/^\//, '')][tabActive] ?? META_TITLES.default
        }
      }
      return {
        ...liveChatScript,
        title: META_TITLES[nameRoute?.replace(/^\//, '')] ?? META_TITLES.default
      }
    }
  },
  head () {
    const nameRoute = this.$getRoute(this.$route).name
    const tabActive = Object.values(this.$getRoute(this.$route).query).filter(item => item).join('-') || 'default'

    switch (nameRoute) {
      case 'account': {
        const tab = this.$getRoute(this.$route).query?.tab || ''
        if (['deposit', 'withdraw'].includes(tab)) {
          return this.showTitleHead(tab)
        }
        return this.showTitleHead(tabActive)
      }
      case 've-chung-toi': {
        return this.showTitleHead(tabActive)
      }
      default:
        return this.showTitleHead()
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/page.scss"></style>
