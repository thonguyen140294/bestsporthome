<template>
  <div class="game-center-item">
    <a class="game-center-item__link" />
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

export default {
  components: {
    AnimatedNumber: () => import('animated-number-vue')
  },
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
