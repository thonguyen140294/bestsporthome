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
    <div class="modal-user-content">
      <p class="close" @click="hideModal">
        <img :src="require('~imageAsset/user/close-login.svg')" alt="">
      </p>
      <div class="modal__logo">
        <div class="modal__head">
          <h3 class="modal__title">
            <span class="display__sp">WELCOME</span> <span class="display__pc">
              <slot name="title" /></span>
          </h3>
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
