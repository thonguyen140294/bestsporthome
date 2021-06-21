<template>
  <div class="banner-hero">
    <div id="bannerHero" v-swiper:swiperBanner="sliderOption" class="swiper-container banner-hero__container">
      <div class="swiper-wrapper banner-hero__wrapper">
        <div v-for="(item, key) in highlight" :key="key" class="swiper-slide banner-hero__slide">
          <div class="banner-hero__link" @click="handleClickSlide"/>
          <img :src="item.hero_banner" alt="" class="banner-hero__img display__pc">
          <img :src="item.hero_banner_mb" alt="" class="banner-hero__img display__sp">
          <div class="banner-hero__news">
            <div class="banner-hero__content">
              <h5 class="banner-hero__category" @click="handleGotoCategory(item)">{{ getCategory(item) }}</h5>
              <div @click="handleClickSlide">
                <p class="banner-hero__text">{{ item.title }}</p>
                <p class="banner-hero__date">
                  <span>{{ item.created_date | formatDate }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="banner-hero__pagination" />
    </div>
  </div>
</template>

<script>
import get from 'lodash/get'
import navigationMixin from '~/mixins/navigation'

export default {
  inject: ['highlight'],
  mixins: [navigationMixin],
  data () {
    return {
      sliderOption: {
        speed: 500,
        autoplay: {
          delay: 5000
        },
        loop: true,
        navigation: {
          nextEl: '.banner-hero__next',
          prevEl: '.banner-hero__prev'
        },
        pagination: {
          el: '.banner-hero__pagination',
          type: 'bullets',
          clickable: 'true'
        },
        on: {
          slideChangeTransitionStart () {
            const $wrapperEl = this.$wrapperEl
            const params = this.params
            $wrapperEl.children(('.' + (params.slideClass) + '.' + (params.slideDuplicateClass)))
              .each(function () {
                const idx = this.getAttribute('data-swiper-slide-index')
                this.innerHTML = $wrapperEl
                  .children('.' + params.slideClass + '[data-swiper-slide-index="' + idx + '"]:not(.' + params.slideDuplicateClass + ')')
                  .html()
              })
          },

          slideChangeTransitionEnd () {
            this.slideToLoop(this.realIndex, 0, false)
          }
        }
      }
    }
  },
  methods: {
    handleClickSlide () {
      const reallyIndex = this.swiperBanner.realIndex
      if (this.highlight[reallyIndex] && this.highlight[reallyIndex].slug) {
        this.$_navigationMixin_navigate(`/${this.highlight[reallyIndex].slug}`, false, false)
      }
    },
    getCategory (cate) {
      return get(cate, 'categories[0].name', '')
    },
    handleGotoCategory (item) {
      if (item) {
        this.$_navigationMixin_navigate(item.category_slug, false, false)
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/news/banner-hero.scss"></style>
