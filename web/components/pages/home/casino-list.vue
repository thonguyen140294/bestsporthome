<template>
  <div class="live-casino">
    <div class="live-casino__hdg">
      <h3>HOT</h3>
      <h3>KITS</h3>
    </div>
    <div v-swiper="swiperOption" class="swiper-container live-casino__container">
      <div class="swiper-wrapper">
        <div v-for="(item,index) in games" :key="index" class="swiper-slide live-casino__slide">
          <CasinoItem :item="item" />
        </div>
      </div>
    </div>
    <div class="live-casino__arrow live-casino__arrow--prev" />
    <div class="live-casino__arrow live-casino__arrow--next" />
  </div>
</template>

<script>
import CasinoItem from '~lobby/casino-item'

export default {
  components: {
    CasinoItem
  },
  props: {
    games: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      swiperOption: {
        speed: 500,
        autoplay: {
          delay: 3000
        },
        slidesPerView: 'auto',
        spaceBetween: 8,
        navigation: {
          nextEl: '.live-casino__arrow--next',
          prevEl: '.live-casino__arrow--prev'
        },
        mousewheel: true,
        keyboard: true,
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 16
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/home/casino-list.scss">
</style>
