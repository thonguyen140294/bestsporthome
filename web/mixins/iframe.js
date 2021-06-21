import IFRAME_GAME_API from '@/api/iframe'
import { IFRAME_GAME_URLS } from '@/config/page-url'

export default {
  methods: {
    $_iframeGameMixin_mapGameApi (url = '') {
      const gameUrl = url || this.$getRoute(this.$route).name
      switch (gameUrl) {
        case IFRAME_GAME_URLS.LIVE_SPORTS : {
          const mid = this.$getRoute(this.$route)?.query?.mid
          if (mid) {
            return `${IFRAME_GAME_API.LIVE_SPORTS}&matchId=${mid}`
          }
          return IFRAME_GAME_API.LIVE_SPORTS
        }
        case IFRAME_GAME_URLS.VIRTUAL_SPORTS :
          return IFRAME_GAME_API.VIRTUAL_SPORTS
        case IFRAME_GAME_URLS.ESPORTS :
          return IFRAME_GAME_API.ESPORTS
        case IFRAME_GAME_URLS.VIRTUAL_GAME :
          return IFRAME_GAME_API.VIRTUAL_GAME
        case IFRAME_GAME_URLS.SABA_CLUB :
          return IFRAME_GAME_API.SABA_CLUB
        case IFRAME_GAME_URLS.NUMBER_GAME :
          return IFRAME_GAME_API.NUMBER_GAME
        case IFRAME_GAME_URLS.TP_NUMBER_GAME :
          return IFRAME_GAME_API.TP_NUMBER_GAME
        case IFRAME_GAME_URLS.KENO :
          return IFRAME_GAME_API.KENO
        case IFRAME_GAME_URLS.TP_KENO :
          return IFRAME_GAME_API.TP_KENO
        case IFRAME_GAME_URLS.LOTTERY :
          return IFRAME_GAME_API.LOTTERY
        case IFRAME_GAME_URLS.TABLE_GAMES :
          return IFRAME_GAME_API.TABLE_GAMES
        case IFRAME_GAME_URLS.LODE :
          return IFRAME_GAME_API.LODE
        case IFRAME_GAME_URLS.LODE_SIEUTOC :
          return IFRAME_GAME_API.LODE_SIEUTOC
        case IFRAME_GAME_URLS.LIVE_CASINO : {
          const category = this.$getRoute(this.$route)?.query?.category
          const tableId = this.$getRoute(this.$route)?.query?.tableId
          return `${IFRAME_GAME_API.LIVE_CASINO}?category=${category}&tableId=${tableId}`
        }
        default:
          return ''
      }
    },
    $_iframeGameMixin_isIframe () {
      return Object.values(IFRAME_GAME_URLS).includes('/' + this.$getRoute(this.$route).name)
    },
    $_iframeGameMixin_redirect (url) {
      if (this.$device.isMobileOrTablet) {
        window.open(url, '_self')
      }
      return false
    }
  }
}
