<template>
  <div v-if="hotMatch && hotMatch.length" class="hotmatch-section">
    <div v-swiper="sliderOption" class="swiper-container hotmatch-section__container">
      <div class="swiper-wrapper">
        <div v-for="(item,index) in hotMatch" :key="index" class="swiper-slide">
          <MatchItem :item="item" :index="index" />
        </div>
      </div>
      <div class="hotmatch__arrow hotmatch__arrow--prev" />
      <div class="hotmatch__arrow hotmatch__arrow--next" />
    </div>
  </div>
</template>
<script>
import MatchItem from '~news/match-item'
import navigationMixin from '~/mixins/navigation'
import IFRAME_GAME_API from '~/api/iframe'

export default {
  components: {
    MatchItem
  },
  mixins: [navigationMixin],
  data () {
    return {
      hotMatch: []
    }
  },
  computed: {
    sliderOption () {
      return {
        speed: 500,
        autoplay: {
          delay: 4000
        },
        slidesPerView: 1,
        centeredSlides: this.hotMatch.length === 1,
        spaceBetween: 8,
        breakpoints: {
          1400: {
            slidesPerView: this.hotMatch.length === 2 ? this.hotMatch.length : 3,
            spaceBetween: 0,
            slidesPerGroup: this.hotMatch.length === 2 ? this.hotMatch.length : 3
          },
          1050: {
            slidesPerView: 2,
            spaceBetween: 0,
            slidesPerGroup: 2
          }
        }
      }
    }
  },
  mounted () {
    this.getHotMatch()
    document.addEventListener('click', this.handleClickSlide)
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickSlide)
  },
  methods: {
    handleClickSlide (e) {
      const reallyIndex = e.target.dataset.key
      if (reallyIndex !== undefined) {
        if (this.hotMatch[reallyIndex] && this.hotMatch[reallyIndex].match_id) {
          const url = this.$device.isMobileOrTablet
            ? `${IFRAME_GAME_API.LIVE_SPORTS}&matchId=${this.hotMatch[reallyIndex].match_id}`
            : '/live-sports?mid=' + this.hotMatch[reallyIndex].match_id
          this.$_navigationMixin_navigate(url, false, this.$device.isMobileOrTablet, true)
        }
      }
    },
    async getHotMatch () {
      try {
        const res = await this.$axios.$get('hotmatch/list')
        this.hotMatch = res.data
      } catch (e) {
        this.hotMatch = []
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/news/hotmatch-section.scss"></style>
