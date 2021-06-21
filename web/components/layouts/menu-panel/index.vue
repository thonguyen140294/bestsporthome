<template>
  <ModalPanel :config="config">
    <template #content>
      <UserLoginSection v-if="currentUser" />
      <UserNotLoginSection v-else />
      <SportSection />
      <GameCenterSection :link-active="linkActive" />
      <CasinoSection :link-active="linkActive" />
      <GuideSection />
    </template>
  </ModalPanel>
</template>

<script>
import UserLoginSection from './user-login-section'
import UserNotLoginSection from './user-not-login-section'
import SportSection from './sport-section'
import CasinoSection from './casino-section'
import GameCenterSection from './game-center-section'
import GuideSection from './guide-section'
import ModalPanel from '~common/modal-panel'
import globalMixin from '~/mixins/global-mixin'
import { MODAL } from '~/config/constant'

export default {
  components: {
    ModalPanel,
    UserLoginSection,
    UserNotLoginSection,
    SportSection,
    CasinoSection,
    GameCenterSection,
    GuideSection
  },
  mixins: [globalMixin],
  data () {
    return {
      config: {
        id: MODAL.NAVIGATION,
        class: 'modal--menu-navigation'
      },
      linkActive: ''
    }
  },
  watch: {
    $route: {
      handler (route) {
        this.linkActive = route.fullPath
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss" src="">
</style>
