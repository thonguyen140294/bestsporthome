<template>
  <div ref="optionSwiper" v-swiper="optionSwiper" class="game-menu-list game-list__container swiper-container">
    <ul class="nav swiper-wrapper">
      <GameMenuItem v-for="(item, index) in items" :key="index" :tab="item.gameQuery" :item="item" class="swiper-slide" />
    </ul>
    <div class="game-list__arrow prev"><i /></div>
    <div class="game-list__arrow next"><i /></div>
  </div>
</template>

<script>
import { gameMenu } from '@/resources/game-menu'
import GameMenuItem from '~lobby/game-menu-item'
import lobbySwiperMixin from '~/mixins/lobby-swiper'

export default {
  components: {
    GameMenuItem
  },
  mixins: [lobbySwiperMixin],
  data () {
    return {
      items: gameMenu
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/lobby/game-menu-list.scss"></style>
<style scoped lang="scss" src="~scssAsset/pages/lobby/game-list.scss">
