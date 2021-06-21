<template>
  <div class="list-game">
    <a v-for="game in games" :key="game.id" href="javascript:void(0)" class="list-game__item" @click="handleClickGame(game)">
      <div class="list-game__icon">
        <i :class="`icon icon-${game.icon}`" />
      </div>
      <span class="list-game__span">{{ game.name }}</span>
    </a>
  </div>
</template>
<script>
import { listGame } from '~/resources/about'
import navigateMixin from '~/mixins/navigation'
import { IFRAME_GAME_URLS } from '~/config/page-url'

export default {
  mixins: [navigateMixin],
  data () {
    return {
      games: listGame
    }
  },
  methods: {
    handleClickGame (item) {
      let loginRequired = false
      let newTab = false
      if (item.link === IFRAME_GAME_URLS.ESPORTS) {
        loginRequired = true
        newTab = this.$device.isMobileOrTablet
      }
      this.$_navigationMixin_navigate(item.link, loginRequired, newTab, item.mainWallet)
    }
  }
}
</script>
<style lang="scss" src="~scssAsset/pages/about/list-game.scss">
</style>
