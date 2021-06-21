<template>
  <div class="game-center-item">
    <a class="game-center-item__link" @click="$_lobbyGameMixin_openGame(item)" />
    <div v-show="isLoading" class="show-loading">
      <div class="wrap-loading">
        <div class="circle-border">
          <div class="circle-core" />
        </div>
        <div class="circle-core-img">
          <img :src="require('~imageRoot/icons/icon-game.svg')" alt="Loading" loading="lazy">
        </div>
      </div>
      <noscript inline-template>
        <div class="noscript-img">
          <img :src="item.imgSrc" :alt="item.title">
        </div>
      </noscript>
    </div>
    <div v-show="!isLoading" class="game-center-item__wrap-img">
      <img :src="item.imgSrc" :alt="item.title" @load="onLoaded">
      <client-only>
        <div v-if="item.jackpot && $_jackpotMixin_getJackpot(item.gameId)" class="game-center-item__wrap-img__jack-pot">
          $<AnimatedNumber :value="$_jackpotMixin_getJackpot(item.gameId)" :format-value="$_jackpotMixin_formatToPrice" :duration="1000" />
        </div>
      </client-only>
    </div>
    <div class="game-center-item__title">
      <span :class="isMainWallet ? 'game-center-item__main-wallet' : null">{{ getPrefixTagWallet }}</span>
      <span v-show="getPrefixTagWallet">&ndash;</span>
      {{ item.title }}
    </div>
  </div>
</template>

<script>

import { WALLET } from '@/config/constant'
import lobbyGameMixin from '~/mixins/lobby-game'
import jackpotMixin from '~/mixins/jackpot'

export default {
  components: {
    AnimatedNumber: () => import('animated-number-vue')
  },
  mixins: [lobbyGameMixin, jackpotMixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    isMainWallet () {
      return this.item.wallet === WALLET.MAIN
    },
    getPrefixTagWallet () {
      const tag = {
        [WALLET.MAIN]: '[C]',
        [WALLET.SUB]: '[P]'
      }
      return tag[this.item.wallet] || ''
    }
  },
  created () {
    this.onLoading()
  },
  methods: {
    onLoading () {
      this.isLoading = true
    },
    onLoaded () {
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/game-center-item.scss">
</style>
