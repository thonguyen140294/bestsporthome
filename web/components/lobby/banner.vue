<template>
  <div class="banner">
    <div class="banner__item banner__item--mp4">
      <a class="banner__link" @click="$_lobbyGameMixin_openGame(item)"></a>
      <picture>
        <source media="(max-width: 980px)" :srcset="require('~imageAsset/lobby/banner/slot-sp.jpg')">
        <img :src="require('~imageAsset/lobby/banner/slot.jpg')" alt="banner" class="banner__img">
      </picture>
      <video
        :src="require('~imageAsset/lobby/banner/cleopatra-mb.mp4')"
        controls
        autoplay
        loop
        muted
        playsinline
        class="banner__video banner__video--mb"
      />
      <video
        :src="require('~imageAsset/lobby/banner/cleopatra-pc.mp4')"
        controls
        autoplay
        loop
        muted
        playsinline
        class="banner__video banner__video--pc"
      />
      <div class="banner-mp4">
        <a class="banner-mp4__category" href="javascript:void(0)" @click="clickMenuItem(item)">Jackpots</a>
        <h1 class="banner-mp4__title">BÍ MẬT CLEOPATRA</h1>
        <BaseButton
          class-name="base-button--bg-red btn--choingay"
          @click="$_lobbyGameMixin_openGame(item)"
        >
          CHƠI NGAY
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import lobbyGameMixin from '~/mixins/lobby-game'
import BaseButton from '~common/base-button'
export default {
  components: {
    BaseButton
  },
  mixins: [lobbyGameMixin],
  data () {
    return {
      item: {
        gameId: 'kts9988',
        loginRequired: true,
        newTab: true,
        promotionPrevent: false,
        gameUrl: '',
        gameType: 'gp_url',
        gameQuery: 'jackpots'
      }
    }
  },
  methods: {
    clickMenuItem (item) {
      this.$router.push({ query: { game: item.gameQuery }, params: { savePosition: true } })
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/banner.scss"></style>
