<template>
  <div v-swiper="swiperOption" class="swiper-container hotmatch">
    <div class="swiper-wrapper">
      <div v-for="(item,index) in hotMatch" :key="index" class="swiper-slide">
        <HotmatchItem :item="item" />
      </div>
    </div>
    <div class="hotmatch__arrow hotmatch__arrow--prev" />
    <div class="hotmatch__arrow hotmatch__arrow--next" />
  </div>
</template>

<script>
import $ from 'jquery'
import HotmatchItem from './hotmatch-item'

export default {
  components: {
    HotmatchItem
  },
  props: {
    hotMatch: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      swiperOption: {
        speed: 500,
        fadeEffect: { crossFade: true },
        virtualTranslate: true,
        effect: 'fade',
        navigation: {
          nextEl: '.hotmatch__arrow--next',
          prevEl: '.hotmatch__arrow--prev'
        },
        on: {
          slideChangeTransitionStart () {
            const flagLeft = $('.hotmatch-item__left > .hotmatch-item__flag')
            const flagRight = $('.hotmatch-item__right > .hotmatch-item__flag')
            let bgColors = [
              'hotmatch-item__flag--red',
              'hotmatch-item__flag--yellow',
              'hotmatch-item__flag--blue',
              'hotmatch-item__flag--green'
            ]
            bgColors.forEach((element) => {
              flagLeft.removeClass(element)
              flagRight.removeClass(element)
            })
            const bgColorLeft = bgColors[Math.random() * bgColors.length >> 0]
            bgColors = bgColors.filter(item => item !== bgColorLeft)
            const bgColorRight = bgColors[Math.random() * bgColors.length >> 0]
            flagLeft.addClass(bgColorLeft)
            flagRight.addClass(bgColorRight)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/hotmatch.scss"></style>
