<template>
  <div v-if="packages" v-swiper="options" class="promotion-package">
    <div
      class="promotion-package__list swiper-wrapper"
    >
      <div v-for="(item) in packages" :key="item.id" class="package swiper-slide">
        <input
          :id="`promotion${item.id}`"
          v-model="currentValue"
          type="radio"
          name="promotion"
          :value="item.id"
          :checked="currentValue === item.id"
        >
        <label class="package__wrap" :for="`promotion${item.id}`">
          <div class="package__wrap-img">
            <img :src="require(`~imageAsset/account/promotion-package/package-${item.id}.png`)" :alt="`package-${item.id}`">
          </div>
          <div class="package__selected">
            <img class="main-wallet__icon-size" :src="require('~imageRoot/icons/selected-promotion.svg')" alt="">
          </div>
          <div class="package__content">
            <div class="package__info">
              <p class="package__title" v-html="item.title" />
              <p class="package__number" v-html="item.amount" />
              <p class="package__text" v-html="item.description" />
            </div>
          </div>
        </label>
      </div>
    </div>
    <div slot="button-prev" class="swiper-button-prev"><i /></div>
    <div slot="button-next" class="swiper-button-next"><i /></div>
    <em v-if="currentPackage" class="promotion-package__note">{{ currentPackage.mDescription }}</em>
  </div>
</template>

<script>
import promotionMixin from '~/mixins/promotion'

export default {
  mixins: [promotionMixin],
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    inputValue: {
      type: Number,
      default: 1
    },
    packages: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      packageEnum: {
        commission: 1,
        welcome: 2,
        first_50: 3,
        promotion: 4,
        saturday: 5,
        bonus: 6
      },
      options: {
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        centeredSlides: true,
        centeredSlidesBounds: false,
        watchOverflow: true,
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        },
        breakpoints: {
          768: {
            centeredSlides: false
          }
        }
      }
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.inputValue
      },
      set (value) {
        this.$emit('change', value)
      }
    },
    currentPackage () {
      return this.packages.find(item => item.id === this.currentValue)
    }
  },
  watch: {
    packages: {
      handler (packages) {
        this.setDefaultPackage(packages)
      },
      immediate: true
    },
    '$route.query.package': {
      handler (value) {
        const pack = this.packages.find(item => item.id === this.packageEnum[value])
        this.currentValue = pack ? this.packageEnum[value] : 1
      },
      immediate: true
    }
  },
  methods: {
    setDefaultPackage (packages) {
      if (packages.length) {
        const packageRouter = this.$getRoute(this.$route).query.package
        if (packageRouter) {
          this.currentValue = this.packageEnum[packageRouter]
        } else {
          const [currentPackage] = packages
          this.currentValue = this.currentValue ?? currentPackage.id
        }
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/account/promotion-package.scss"></style>
