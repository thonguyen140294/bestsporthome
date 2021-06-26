<template>
  <div class="promotion">
    <h3>ƯU ĐÃI ĐẶC BIỆT CHO THÀNH VIÊN</h3>
    <div id="promotion" v-swiper="swiperOption">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in swiperItems" :key="index" class="swiper-slide">
          <a class="promotion__link" href="javascript:void(0)" @click.prevent="$_navigationMixin_navigate(item.link, item.loginRequired, false, true)">
            <img class="promo-home__img" :src="item.src" :alt="item.promotion">
						<div class="promotion__content">
              <div class="promotion__left">
                <h4>{{ item.bonus.text }} <span>{{ item.bonus.value }}</span></h4>
                <h4>{{ item.upTo.text }} <span>{{ item.upTo.value }}</span></h4>
                <p>{{ item.promotion }}</p>
              </div>
              <div v-if="isRecharge" class="promotion__right display__pc">
                <BaseButton class-name="base-button--bg-red" @click="$_navigationMixin_navigate(item.link, item.loginRequired, false, true)">NẠP TIỀN NGAY</BaseButton>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div slot="button-next" class="swiper-button-next"><i /></div>
    <div slot="pagination" class="swiper-pagination-promotion">
      <span class="swiper-pagination-bullet" />
      <span class="swiper-pagination-bullet" />
      <span class="swiper-pagination-bullet swiper-pagination-bullet-active" />
    </div>
  </div>
</template>

<script>
import navigationMixin from '~/mixins/navigation'
import BaseButton from '~common/base-button'

export default {
  components: {
    BaseButton
  },
  mixins: [navigationMixin],
  props: {
    items: {
      type: Array,
      default: () => []
    },
    isRecharge: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      swiperItems: this.items
    }
  },
  computed: {
    swiperOption () {
      return {
        loop: true,
        slidesPerView: 1,
        autoplay: {
          delay: 5000
        },
        pagination: {
          el: '.swiper-pagination-promotion'
        },
        navigation: {
          nextEl: '.swiper-button-next'
        },
        breakpoints: {
          981: {
            slidesPerView: 1.1,
            spaceBetween: 16
          },
          1400: {
            slidesPerView: this.isRecharge ? 1.2 : 1.05,
            spaceBetween: 16
          }
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
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/home/promotion.scss"></style>
