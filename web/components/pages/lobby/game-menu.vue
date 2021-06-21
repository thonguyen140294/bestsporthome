<template>
  <div :class="['game-menu', { 'searching': isSearching }]">
    <div :class="['game-menu__wrap', { 'open': isOpenWalletTransfer }]">
      <GameMenuList />
      <div v-if="currentUser" class="wallet display__pc">
        <div class="wallet__transfer">
          <p title="Chuyển Ví" :class="['wallet__icon', { 'active': isOpenWalletTransfer }]" @click="openWalletTransfer"/>
          <div class="wallet__content">
            <WalletTransfer />
          </div>
        </div>
      </div>
      <LobbySearch @searched="isSearching = $event" v-on="$listeners" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GameMenuList from './game-menu-list'
import LobbySearch from '~lobby/lobby-search'
import walletTransferMixin from '~/mixins/account/wallet-transfer'
import maintenanceMixin from '~/mixins/maintenance'
import WalletTransfer from '~account/wallet-transfer'

export default {
  components: {
    GameMenuList,
    LobbySearch,
    WalletTransfer
  },
  mixins: [walletTransferMixin, maintenanceMixin],
  data () {
    return {
      isSearching: false,
      isOpenWalletTransfer: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    openWalletTransfer () {
      if (!this.$_maintainMixin_checkWalletMaintain(
        this.$store.state.maintenance.maintenance.startTime,
        this.$store.state.maintenance.maintenance.endTime
      )) {
        this.$store.commit('maintenance/setShowWalletMaintenance', false)
        this.isOpenWalletTransfer = !this.isOpenWalletTransfer
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '~scssAsset/user/wallet.scss';
  @import '~scssAsset/pages/lobby/game-menu.scss';
</style>
