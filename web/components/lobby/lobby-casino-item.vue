<template>
  <div class="lobby-casino-item">
    <a class="lobby-casino-item__link" href="javascript:void(0)" @click="handleClickCasinoItem" />
    <div v-show="isLoading" class="show-loading">
      <div class="wrap-loading">
        <div class="circle-border">
          <div class="circle-core" />
        </div>
        <div class="circle-core-img">
          <img :src="require('~imageRoot/icons/icon-game.svg')" alt="">
        </div>
      </div>
      <noscript inline-template>
        <div class="noscript-img">
           <img :src="item.imgSrc" :alt="item.title">
        </div>
      </noscript>
    </div>
    <div v-show="!isLoading" class="lobby-casino-item__wrap-img">
      <img :src="item.imgSrc" :alt="item.title" @load="onLoaded">
      <p class="lobby-casino-item__wrap-img__jack-pot">
        {{ item.range }}
      </p>
    </div>
    <p class="lobby-casino-item__title">{{ item.title }}</p>
  </div>
</template>

<script>
import navigateMixin from '~/mixins/navigation'
import promotionMixin from '~/mixins/promotion'
import lobbyGameMixin from '~/mixins/lobby-game'
import IFRAME_GAME_API from '~/api/iframe'

export default {
  mixins: [navigateMixin, lobbyGameMixin, promotionMixin],
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
  created () {
    this.onLoading()
  },
  methods: {
    onLoading () {
      this.isLoading = true
    },
    onLoaded () {
      this.isLoading = false
    },
    handleClickCasinoItem () {
      const gameUrl = this.$device.isMobileOrTablet
        ? `/${IFRAME_GAME_API.LIVE_CASINO}?category=${this.item.category}&tableId=${this.item.tableId}`
        : `/casino?category=${this.item.category}&tableId=${this.item.tableId}`
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

<style scoped lang="scss" src="~scssAsset/lobby/lobby-casino-item.scss">
</style>
