<template>
  <div class="hot-kit-list">
    <div class="hot-kit-list__hdg">
      <h3>HOT</h3>
      <h3>KITS</h3>
    </div>
    <div v-swiper="swiperOption" class="swiper-container hot-kit-list__container">
      <div class="swiper-wrapper">
        <div v-for="(item,index) in kits" :key="index" class="swiper-slide hot-kit-list__slide">
          <HotKitItem :item="item" />
        </div>
      </div>
    </div>
    <div class="hot-kit-list__arrow hot-kit-list__arrow--prev" />
    <div class="hot-kit-list__arrow hot-kit-list__arrow--next" />
  </div>
</template>

<script>
import HotKitItem from '~lobby/hot-kit-item'

export default {
  components: {
    HotKitItem
  },
  props: {
    kits: {
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
          nextEl: '.hot-kit-list__arrow--next',
          prevEl: '.hot-kit-list__arrow--prev'
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

<style scoped lang="scss" src="~scssAsset/pages/home/hot-kit-list.scss">
</style>
