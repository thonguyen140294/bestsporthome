<template>
  <section>
    <div v-if="itemTurnover" class="game-feature game-feature--slot">
      <div v-bind:style="[itemTurnover.imgSrc ? {'background-image': 'url(' + itemTurnover.imgSrc + ')'} : {'background': '#0C0A0A'}]" class="game-feature__bg-img"></div>
      <div class="game-feature__wrap">
        <img :src="itemTurnover.imgSrc" :alt="itemTurnover.title" @click="$_lobbyGameMixin_openGame(itemTurnover)">
      </div>
      <div class="game-feature__content">
        <p class="game-feature__text"> GAME SLOT CỦA THÁNG </p>
        <p class="game-feature__name">{{ itemTurnover.title }}</p>
        <client-only>
          <p v-if="$_jackpotMixin_getJackpot(itemTurnover.gameId)" class="game-feature__jack-pot">
            $<AnimatedNumber :value="$_jackpotMixin_getJackpot(itemTurnover.gameId)" :format-value="$_jackpotMixin_formatToPrice" :duration="1000" />
          </p>
        </client-only>
        <BaseButton
          class-name="base-button--bg-red base-button--banner btn--choingay"
          @click="$_lobbyGameMixin_openGame(itemTurnover)"
        >
          CHƠI NGAY
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script>

import BaseButton from '~common/base-button'
import jackpotMixin from '~/mixins/jackpot'
import lobbyGameMixin from '~/mixins/lobby-game'

export default {
  components: {
    BaseButton,
    AnimatedNumber: () => import('animated-number-vue')
  },
  mixins: [jackpotMixin, lobbyGameMixin],
  props: {
    itemTurnover: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/game-feature.scss">
</style>
