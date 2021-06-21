<template>
  <section class="lobby">
    <Banner />
    <GameMenu
      @change-game-wallet="selectedGameWallet = $event"
      @change-provider="selectedProvider = $event"
      @search-game-name="searchGameName = $event"
    />
    <GameSection :lobby-game-fillter="lobbyGameFillter" :lobby-game-search="lobbyGameSearch" />
    <QuickRegisterSection v-if="!isLogged" class="quick-register" />
  </section>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import globalMixin from '~/mixins/global-mixin'
import scrollTabMixin from '~/mixins/scroll-tab'
import jackpotMixin from '~/mixins/jackpot'

export default {
  components: {
    GameSection: () => import('./game-section'),
    Banner: () => import('~lobby/banner'),
    QuickRegisterSection: () => import('~pages/home/quick-register-section'),
    GameMenu: () => import('./game-menu')
  },
  mixins: [globalMixin, scrollTabMixin, jackpotMixin],
  data () {
    return {
      searchGameName: '',
      selectedGameWallet: 'all',
      selectedProvider: 'all'
    }
  },
  computed: {
    lobbyGameFillter () {
      return {
        provider: this.selectedProvider,
        gameWallet: this.selectedGameWallet
      }
    },
    lobbyGameSearch () {
      return this.searchGameName
    },
    providerCurrent () {
      return this.$store.state.games.selectedProvider
    }
  },
  watch: {
    searchGameName: {
      handler () {
        this.selectedGameWallet = 'all'
        this.selectedProvider = 'all'
      },
      immediate: true
    },
    providerCurrent: {
      handler (value) {
        this.selectedProvider = value
        this.$emit('changeProvider', this.selectedProvider)
      },
      immediate: true
    }
  },
  mounted () {
    if (isEmpty(this.$store.state.jackpot)) {
      this.$_jackpotMixin_GetListJackpot()
    }
    this.selectScrollTabGameItem()
  },
  destroyed () {
    this.$store.commit('games/resetProvider')
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/lobby/index.scss">
</style>
