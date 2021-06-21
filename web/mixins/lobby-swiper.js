export default {
  data () {
    return {
      optionSwiper: {}
    }
  },
  computed: {
    initialSlide () {
      const indexSlide = Object.keys(this.items).findIndex(gameQuery => gameQuery === this.$route.query.game)
      if (indexSlide === -1) {
        return 0
      }
      return indexSlide
    }
  },
  watch: {
    $route: {
      handler () {
        if (this.$refs.optionSwiper) {
          this.$refs.optionSwiper.swiper.slideTo(this.initialSlide, 1000, true)
        }
      }
    }
  },
  created () {
    this.handleOptionSwiper()
  },
  methods: {
    handleOptionSwiper () {
      this.optionSwiper = {
        initialSlide: this.initialSlide,
        slidesPerView: 'auto',
        spaceBetween: 2,
        slideToClickedSlide: true,
        centeredSlides: true,
        centeredSlidesBounds: true,
        centerInsufficientSlides: true,
        grabCursor: true,
        navigation: {
          prevEl: '.prev',
          nextEl: '.next'
        },
        breakpoints: {
          1850: {
            centeredSlides: false,
            centeredSlidesBounds: false
          },
          1336: {
            slidesPerGroup: 4
          },
          1900: {
            slidesPerGroup: 10
          }
        }
      }
    }
  }
}
