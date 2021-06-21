<template>
  <div class="sport-center-load-more">
    <div class="sport-center-load-more__wrap-more">
      <span>Xem thêm <img :src="require('~imageRoot/icons/icon-down-traight.svg')" alt="xem thêm"></span>
      <nuxt-link :to="loadmore" class="sport-center-load-more__link" />
    </div>
  </div>
</template>

<script>

import { LOBBY_GAME_URLS } from '@/config/page-url'
export default {
  props: {
    selected: {
      type: String,
      default: 'all'
    }
  },
  data () {
    return {
      LOBBY_GAME_URLS
    }
  },
  computed: {
    loadmore () {
      switch (this.selected) {
        case 'all': return LOBBY_GAME_URLS.ALL
        case 'slot': return LOBBY_GAME_URLS.SLOT
        case 'fishing': return LOBBY_GAME_URLS.FISHING
        case 'ingame': return LOBBY_GAME_URLS.INGAME
        case 'lottery': return LOBBY_GAME_URLS.LOTTERY
        case 'instant_games': return LOBBY_GAME_URLS.INSTANT_GAMES
        case 'lode': return LOBBY_GAME_URLS.LODE
        case 'quickgame': return LOBBY_GAME_URLS.QUICKGAME
        default: return LOBBY_GAME_URLS.ALL
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/home/sport-center-load-more.scss">
</style>
