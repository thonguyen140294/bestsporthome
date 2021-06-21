<template>
  <b-modal
    :id="config.id"
    :modal-class="config.class"
    hide-header
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    ok-only
    no-stacking
    no-fade
  >
    <div class="modal-user-image">
      <slot name="bg-image" />
      <div class="modal-packages">
        <div v-swiper:modalUserPromotionSwiper="swiperOption" class="swiper-container promo-section promotion-list__container">
          <div class="promo swiper-wrapper">
            <a href="javascript:void(0)" @click="clickPromotion" class="promo__item swiper-slide">
              <div class="promo__banner">
                <div class="promo__wrap-img">
                  <img :src="require('~imageRoot/components/pages/about/promos/100.png')" alt="">
                </div>
                <div class="promo__banner-content">
                  <p class="promo__title">
                    Nạp lần đầu tiên
                  </p>
                  <p class="promo__number">+ 110 %</p>
                  <p class="promo__text">Tối đa <b>10.000.000</b> VND</p>
                </div>
              </div>
            </a>
            <a href="javascript:void(0)" @click="clickPromotion" class="promo__item swiper-slide">
              <div class="promo__banner">
                <div class="promo__wrap-img">
                  <img :src="require('~imageRoot/components/pages/about/promos/naplandau.png')" alt="">
                </div>
                <div class="promo__banner-content">
                  <p class="promo__title">Nạp lần đầu tiên</p>
                  <p class="promo__number">+ 50 %</p>
                  <p class="promo__text">Tối đa <b>15.000.000</b> VND</p>
                </div>
              </div>
            </a>
            <a href="javascript:void(0)" @click="clickPromotion" class="promo__item swiper-slide">
              <div class="promo__banner">
                <div class="promo__wrap-img">
                  <img :src="require('~imageRoot/components/pages/about/promos/20.png')" alt="">
                </div>
                <div class="promo__banner-content">
                  <p class="promo__title">Nạp tiền lần 2</p>
                  <p class="promo__number">+ 30 %</p>
                  <p class="promo__text">Tối đa <b>10.000.000</b> VND</p>
                </div>
              </div>
            </a>
            <a href="javascript:void(0)" @click="clickPromotion" class="promo__item swiper-slide">
              <div class="promo__banner">
                <div class="promo__wrap-img">
                  <img :src="require('~imageRoot/components/pages/about/promos/158.png')" alt="">
                </div>
                <div class="promo__banner-content">
                  <p class="promo__title">HOÀN TRẢ VÔ TẬN</p>
                  <p class="promo__number">+ 1.25 %</p>
                  <p class="promo__text">Thể thao & Thể thao ảo</p>
                </div>
              </div>
            </a>
            <a href="javascript:void(0)" @click="clickPromotion" class="promo__item swiper-slide">
              <div class="promo__banner">
                <div class="promo__wrap-img">
                  <img :src="require('~imageRoot/components/pages/about/promos/nganhangchinhchu.png')" alt="">
                </div>
                <div class="promo__banner-content">
                  <p class="promo__title">Thưởng nạp</p>
                  <p class="promo__number">+ 100K</p>
                  <p class="promo__text">Ngân hàng chính chủ</p>
                </div>
              </div>
            </a>
            <a href="javascript:void(0)" @click="clickPromotion" class="promo__item swiper-slide">
              <div class="promo__banner">
                <div class="promo__wrap-img">
                  <img :src="require('~imageRoot/components/pages/about/promos/napvaothu7.png')" alt="">
                </div>
                <div class="promo__banner-content">
                  <p class="promo__title">Nạp vào thứ 7</p>
                  <p class="promo__number">+ 20 %</p>
                  <p class="promo__text">Tối đa <b>5.000.000</b> VND</p>
                </div>
              </div>
            </a>
          </div>
          <div class="promotion-list__arrow prev"><i /></div>
          <div class="promotion-list__arrow next"><i /></div>
        </div>
      </div>
      <div class="modal-overlay"></div>
    </div>
    <div class="modal-user-content">
      <p class="close" @click="hideModal">
        <img :src="require('~imageAsset/user/close-login.svg')" alt="">
      </p>
      <div class="modal__logo">
        <img :src="require('~imageAsset/common/logo/logo.png')" alt="logo">
        <div class="modal__head">
          <h3 class="modal__title">
            <span class="display__sp">WELCOME</span> <span class="display__pc">
              <slot name="title" /></span>
          </h3>
          <span class="modal__desc">Bảo trợ thương hiệu MU9</span>
          <img class="modal__line" :src="require('~imageAsset/user/line-login.svg')" alt="">
        </div>
      </div>
      <h3 class="modal__title">
        <slot name="title-mobile" />
      </h3>
      <slot name="content" />
    </div>
  </b-modal>
</template>

<script>

export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          id: '',
          class: ''
        }
      }
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
  },
  mounted () {
    // Fix swiper on bootstrap modal
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      setTimeout(() => {
        const evt = window.document.createEvent('UIEvents')
        evt.initUIEvent('resize', true, false, window, 0)
        window.dispatchEvent(evt)
      }, 200)
    })
  },
  methods: {
    hideModal () {
      this.$root.$emit('bv::hide::modal', this.config.id)
    },
    clickPromotion () {
      if (this.$route.name !== 've-chung-toi') {
        this.$router.push('/ve-chung-toi?tab=khuyen-mai')
      } else {
        this.$router.go(0)
      }
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/common/modal-user.scss"></style>
<style lang="scss" scoped src="~scssAsset/user/promotion-section.scss"></style>
