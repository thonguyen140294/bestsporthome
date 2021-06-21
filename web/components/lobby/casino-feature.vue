<template>
  <section>
    <div v-if="itemTurnover" class="casino-feature casino-feature--slot">
      <div class="casino-feature__wrap">
        <img :src="itemTurnover.imgSrc" :alt="itemTurnover.title" @click="handleClickCasinoItem">
      </div>
      <div class="casino-feature__content">
        <p class="casino-feature__text"> LIVE CASINO CỦA THÁNG </p>
        <p class="casino-feature__name">{{ itemTurnover.title }}</p>
        <p class="casino-feature__jack-pot">
          Evolution Gaming
        </p>
        <BaseButton
          class-name="base-button--bg-red base-button--banner btn--choingay"
          @click="handleClickCasinoItem"
        >
          CHƠI NGAY
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script>

import { lobbyCasino } from '@/resources/lobby-casino'
import BaseButton from '~common/base-button'
import lobbyGameMixin from '~/mixins/lobby-game'
import jackpotMixin from '~/mixins/jackpot'
import IFRAME_GAME_API from '~/api/iframe'

export default {
  components: {
    BaseButton
  },
  mixins: [lobbyGameMixin, jackpotMixin],
  async fetch () {
    await this.getItemTurnover(lobbyCasino, 'gameId', 'live-casino')
  },
  data () {
    return {
      itemTurnover: null
    }
  },
  methods: {
    handleClickCasinoItem () {
      const gameUrl = this.$device.isMobileOrTablet
        ? `/${IFRAME_GAME_API.LIVE_CASINO}?category=${this.itemTurnover.category}&tableId=${this.itemTurnover.tableId}`
        : `/casino?category=${this.itemTurnover.category}&tableId=${this.itemTurnover.tableId}`
      this.$_lobbyGameMixin_openGame({
        gameUrl,
        newTab: true,
        promotionPrevent: true,
        loginRequired: true
      })
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/casino-feature.scss">
</style>
