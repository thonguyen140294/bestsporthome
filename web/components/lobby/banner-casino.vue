<template>
  <div class="banner-section">
    <div id="banner">
      <div>
        <div class="banner-item" @click="$emit('clickCasino')">
          <v-component :is="item.content" @clickCasino="$emit('clickCasino')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bannerCasino from '~common/banner-casino'

export default {
  data () {
    return {
      item: {
        link: '/live-casino',
        imgSrc: '/assets/images/components/common/banner-item/live-casino.jpg',
        imgSrcMobile: '/assets/images/components/common/banner-item/live-casino-sp.jpg',
        alt: 'Live Casino Banner',
        loginRequired: false,
        newTab: false,
        content: bannerCasino,
        mainWallet: false
      }
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

<style scoped lang="scss" src="~scssAsset/pages/home/banner-section.scss"></style>
<style scoped lang="scss" src="~scssAsset/common/banner-item.scss"></style>
