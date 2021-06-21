<template>
  <div class="banner-cash banner-case-casino">
    <div class="banner-cash__wrapper">
      <div class="banner-cash__logo">
        <div class="banner-evolution" />
        <div class="banner-live-casino" />
      </div>
      <p class="banner-cash__desc display-pc">Game bài đa dạng: poker, Baccarat, Roulette...</p>
      <p class="banner-cash__desc display-mb">Poker,Baccarat, Roulette, Blackjack...</p>
      <BaseButton class-name="base-button--bg-red base-button--banner" @click="clickBannerCasino()">
        CHƠI NGAY
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '~common/base-button'
import navigateMixin from '~/mixins/navigation'

export default {
  components: {
    BaseButton
  },
  mixins: [navigateMixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    clickBannerCasino () {
      if (this.$route.path !== '/live-casino') {
        this.$_navigationMixin_navigate('/live-casino', false, false, false)
      } else {
        this.$emit('clickCasino')
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/common/banner-cash.scss"></style>
