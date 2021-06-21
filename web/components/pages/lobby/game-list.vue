<template>
  <div v-if="tab !=='all' && tab !=='allgame'" class="game-list">
    <GameCenterItem v-for="(item, key) in items" :key="key" :item="item" />
  </div>
  <div v-else v-swiper="swiperOption" class="swiper-container game-list__container">
    <div class="swiper-wrapper">
      <div v-for="(item, key) in items" :key="key" class="swiper-slide">
        <GameCenterItem :item="item" />
      </div>
    </div>
    <div class="game-list__arrow prev"><i /></div>
    <div class="game-list__arrow next"><i /></div>
  </div>
</template>

<script>
import GameCenterItem from '~lobby/sport-center-item'

export default {
  components: {
    GameCenterItem
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    tab: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      swiperOption: {
        speed: 500,
        slidesPerView: 'auto',
        spaceBetween: 8,
        navigation: {
          nextEl: '.next',
          prevEl: '.prev'
        },
        breakpoints: {
          1400: {
            slidesPerGroup: 3
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/lobby/game-list.scss">
</style>
