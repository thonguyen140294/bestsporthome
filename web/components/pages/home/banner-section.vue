<template>
  <div class="banner-section">
    <div id="banner" v-swiper="swiperOption">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in items" :key="index" class="swiper-slide">
          <BannerItem :item="item" :is-src-mobile="imageSrcMobile" />
        </div>
      </div>
      <div slot="button-prev" class="swiper-button-prev"><i /></div>
      <div slot="button-next" class="swiper-button-next"><i /></div>
      <div slot="pagination" class="swiper-pagination">
        <span class="swiper-pagination-bullet swiper-pagination-bullet-active" />
        <span class="swiper-pagination-bullet" />
      </div>
    </div>
  </div>
</template>

<script>
import { homeBannerItems, bannerOptions } from '~/resources/banner'
import BannerItem from '~common/banner-item'

export default {
  components: {
    BannerItem
  },
  data () {
    return {
      items: homeBannerItems,
      swiperOption: bannerOptions,
      isPortrait: false
    }
  },
  computed: {
    imageSrcMobile () {
      return this.$device.isMobile || (this.$device.isTablet && this.isPortrait)
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$device.isTablet && typeof window !== 'undefined') {
        this.isPortrait = window.matchMedia('(orientation: portrait)').matches
        // check when change orientation
        window.addEventListener('orientationchange', () => {
          this.isPortrait = window.innerHeight > window.innerWidth
        }, false)
      }
    })
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/home/banner-section.scss">
</style>
