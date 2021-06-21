import { IFRAME_GAME_URLS } from '@/config/page-url'
import promotionMixin from '@/mixins/promotion'
import {
  getLodeUrl,
  getLodeSieuTocUrl,
  getKenoUrl,
  getTpNumberGameUrl,
  getGpUrl,
  getInstantGameUrl,
  getLotteryLasVegasUrl,
  getLotteryCyberPunkUrl,
  getPGSoftUrl,
  getGameBaiUrl
} from '~/helper/game-url-utils'

const { LODE, LODE_SIEUTOC, TP_NUMBER_GAME, TP_KENO, LOTTERY_LAS_VEGAS, LOTTERY_CYBER_PUNK } = IFRAME_GAME_URLS

export default {
  mixins: [promotionMixin],
  computed: {
    getCurrentUser () {
      return this.$store.state.currentUser
    },
    isMobile () {
      return this.$device.isMobileOrTablet
    },
    isValidPlanOpenLottery () {
      if (!this.promotion.plan) {
        return true
      }
      return this.promotion.plan?.package_id === this.planType.commission ||
      this.promotion.plan?.package_id === this.planType.bonus
    }
  },
  methods: {
    $_getGameUrlIframe_openClient (gameUrl = '') {
      const url = gameUrl || this.$getRoute(this.$route).name
      switch (url) {
        case LODE:
          return getLodeUrl(this.getCurrentUser, this.isMobile)
        case LODE_SIEUTOC:
          return getLodeSieuTocUrl(this.getCurrentUser, this.isMobile)
        case TP_KENO:
          return getKenoUrl(this.getCurrentUser, this.isMobile)
        case TP_NUMBER_GAME:
          return getTpNumberGameUrl(this.getCurrentUser, this.isMobile)
        case LOTTERY_LAS_VEGAS:
          return getLotteryLasVegasUrl(this.currentUser)
        case LOTTERY_CYBER_PUNK:
          return getLotteryCyberPunkUrl(this.currentUser, this.isValidPlanOpenLottery)
        default:
          return ''
      }
    },
    $_getGameTypeUrl_openClient (gameType, gameId, gameCode) {
      switch (gameType) {
        case 'gp_url':
          return getGpUrl(this.getCurrentUser, gameId)
        case 'instant_games_url':
          return getInstantGameUrl(this.currentUser, gameId)
        case 'pg_url':
          return getPGSoftUrl(this.currentUser, gameCode)
        case 'gamebai_url':
          return getGameBaiUrl(this.currentUser, gameId)
        default:
          return ''
      }
    }
  }
}
