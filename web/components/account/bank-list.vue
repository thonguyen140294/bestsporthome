<template>
  <div v-swiper="options" class="bank-list" :class="{ 'bank-list--error': $v.currentValue.$error }">
    <div class="bank-list__wrap swiper-wrapper">
      <div v-for="(item, index) in banks" :key="`${index}_${item.bank_code}`" class="bank-item swiper-slide">
        <div v-if="item.isMaintain" class="bank-item-maintain">Đang bảo trì</div>
        <input
          :id="item.bank_code"
          v-model="currentValue"
          type="radio"
          name="bank-list"
          :value="item.bank_code"
          :checked="item.value === currentValue"
          :disabled="item.isMaintain"
        >
        <label :for="item.bank_code" :style="{opacity: item.isMaintain ? 0.3 : 1}">
          <template v-if="item.bank_code === currentValue">
            <img
              :src="require(`~imageAsset/account/bank-list/${item.bank_code.toLowerCase()}.svg`)"
              :alt="item.bank_name"
            >
          </template>
          <template v-else>
            <img
              :src="require(`~imageAsset/account/bank-list/${item.bank_code.toLowerCase()}_gray.svg`)"
              :alt="item.bank_name"
            >
          </template>
        </label>
      </div>
    </div>
    <div slot="button-prev" class="swiper-button-prev"><i /></div>
    <div slot="button-next" class="swiper-button-next"><i /></div>
    <em v-if="$v.currentValue.$error" class="error">
      <template v-if="!$v.currentValue.required">Vui lòng chọn ngân hàng</template>
    </em>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    inputValue: {
      type: Object,
      default: () => {}
    },
    banks: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      options: {
        slidesPerView: 'auto',
        freeMode: true,
        slideToClickedSlide: true,
        centeredSlides: true,
        centeredSlidesBounds: true,
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        },
        breakpoints: {
          1400: {
            slidesPerGroup: 5,
            slideToClickedSlide: false,
            centeredSlides: false,
            centeredSlidesBounds: false
          }
        }
      }
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.inputValue ? this.inputValue.bank_code : ''
      },
      set (value) {
        const selected = this.banks.find(item => item.bank_code === value)
        if (selected) {
          this.$emit('change', selected)
        }
      }
    }
  },
  validations () {
    return {
      currentValue: {
        required
      }
    }
  },
  methods: {
    validate () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        return this.currentValue
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/account/bank-list.scss"></style>
