import globalMixin from '@/mixins/global-mixin'
import { mappingIframeGames } from '@/resources/iframe'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

import { WALLET } from '@/config/constant'

import modalMixin from '~/mixins/user/modal'
import panelMenuMixin from '~/mixins/panel-menu'
import promotionMixin from '~/mixins/promotion'
import gameUrlClientMixin from '~/mixins/game-url-client'
import maintenanceMixin from '~/mixins/maintenance'
import iframeMixin from '~/mixins/iframe'
import { ICON_ERROR } from '~/config/constant'
import { getListIdentify, getItemFromListObject } from '~/helper/object-utils'
import { COMMON_LOBBY_API } from '~/api/lobby'

dayjs.extend(isBetween)

export default {
  mixins: [
    modalMixin,
    panelMenuMixin,
    globalMixin,
    promotionMixin,
    gameUrlClientMixin,
    maintenanceMixin,
    iframeMixin
  ],
  methods: {
    async $_lobbyGameMixin_openGame ({
      apiUrl = '',
      gameId = '',
      loginRequired = false,
      newTab = false,
      promotionPrevent = false,
      gameUrl = '',
      wallet,
      gameType = '',
      provider = '',
      gameCode = ''
    }) {
      const apiPath = this.$_lobbyGameMixin_gamePath(apiUrl, gameId)
      if (wallet === WALLET.MAIN && this.$_maintainMixin_checkMainWalletGame()) {
        return
      }

      this.$_modalMixin_closeAllModal()
      this.$_panelMenuMixin_reset()

      let isNewTab = newTab
      const urlOpenIframe = gameUrl ? this.$_getGameUrlIframe_openClient(gameUrl) : ''
      if (this.$device.isMobileOrTablet && gameUrl in mappingIframeGames) {
        isNewTab = true
      }
      if (loginRequired && this.currentUser === null) {
        this.$_modalMixin_openModal('modalLogin')
        return
      }
      if (this.visibleRollingChart && promotionPrevent) {
        this.$swal({
          title: 'THÔNG BÁO',
          text: 'Bạn không được chơi Live Casino, inGame, Quay số khi đang tham gia khuyến mãi',
          icon: ICON_ERROR.casino,
          dangerMode: true,
          buttons: {
            close: {
              text: 'X',
              className: 'swal-close'
            },
            confirm: {
              text: 'ĐÓNG',
              className: 'swal-confirm'
            }
          }
        })
        return
      }
      const target = isNewTab ? '_blank' : '_self'
      // open client
      const urlOpenClient = this.$_getGameTypeUrl_openClient(gameType, gameId, gameCode)
      const gameOpenUrl = urlOpenIframe || urlOpenClient
      if (gameOpenUrl) {
        this.openGameAbsoluteUrl(gameOpenUrl, gameUrl, isNewTab)
        return
      }
      if (gameUrl) {
        await this.openGameRelativeUrl(gameUrl, isNewTab, provider)
        return
      }

      isNewTab = window.open('', target)
      const url = await this.getGameUrl(apiPath, provider)
      if (url) {
        isNewTab.location.href = url
      } else {
        isNewTab.close()
      }
    },
    async getGameUrl (apiUrl, provider = '') {
      try {
        const result = await this.$axios.$get(apiUrl, {
          params: {
            isMobile: this.$device.isMobileOrTablet
          }
        })
        if (result.status === 'OK') {
          return result.data.url
        }
      } catch (e) {
        this.$store.commit('maintenance/setShowGameMaintenance', true)
        return ''
      }
    },
    $_lobbyGameMixin_gamePath (apiUrl, gameId) {
      return gameId ? apiUrl + '?gameName=' + gameId : apiUrl
    },
    openGameAbsoluteUrl (gameOpenUrl, gameUrl, isNewTab) {
      if (isNewTab && gameOpenUrl) {
        window.open(gameOpenUrl, '_blank')
      } else {
        this.$router.push(gameUrl)
      }
    },
    async openGameRelativeUrl (gameUrl, isNewTab, provider) {
      if (this.$device.isMobileOrTablet && isNewTab) {
        isNewTab = window.open('', '_blank')
        const url = await this.getGameUrl(this.$_iframeGameMixin_mapGameApi(gameUrl) || gameUrl, provider)
        if (url) {
          isNewTab.location.href = url
        } else {
          isNewTab.close()
        }
      } else if (isNewTab) {
        window.open(gameUrl, '_blank')
      } else {
        this.$router.push(gameUrl)
      }
    },
    async getItemTurnover (listGame, keyGame, gameType) {
      const keyList = getListIdentify(listGame, keyGame)
      const turnoverBody = {
        gameType,
        gameIds: keyList
      }
      try {
        const { data } = await this.$axios.$post(COMMON_LOBBY_API.TURNOVER, turnoverBody)
        if (data && data.gameId) {
          this.itemTurnover = getItemFromListObject(listGame, keyGame, data.gameId)
        }
      } catch (error) {
        this.itemTurnover = null
      }
    }
  }
}
