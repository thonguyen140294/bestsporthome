<template>
  <div v-swiper="options" class="bank-card-list">
    <div class="bank-card-list__wrap swiper-wrapper">
      <div v-for="(item, index) in banks" :key="`${index}_${item.bank_code}`" class="bank-card-item swiper-slide">
        <input
          :id="item._id"
          v-model="currentValue"
          type="radio"
          name="bank-card-list"
          :value="item._id"
          :checked="item._id === currentValue"
        >
        <label :for="item._id">
          <div class="bank-card-item__content">
            <div class="bank-card-item__wrap">
              <p>
                <span>Tên tài khoản</span>
                <b>{{ item.bank_account_name }}</b>
              </p>
              <img :src="require(`~imageAsset/account/bank-list/${item.bank_code.toLowerCase()}.svg`)" :alt="item.bank_name">
            </div>
            <div class="bank-card-item__wrap">
              <p>
                <span>Số tài khoản</span>
                <b>{{ item.bank_account_no }}</b>
              </p>
            </div>
          </div>
        </label>
      </div>
    </div>
    <div slot="button-prev" class="swiper-button-prev"><i /></div>
    <div slot="button-next" class="swiper-button-next"><i /></div>
    <em v-if="$v.currentValue.$error" class="error">
      <template v-if="!$v.currentValue.required">Vui lòng chọn tài khoản ngân hàng rút tiền</template>
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
        slideToClickedSlide: true,
        centeredSlides: true,
        centeredSlidesBounds: true,
        freeMode: true,
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        },
        on: {
          init () {
            this.params.centeredSlides = this.slides.length !== 2
            this.update()
          }
        }
      }
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.inputValue ? this.inputValue._id : ''
      },
      set (value) {
        const selected = this.banks.find(item => item._id === value)
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

<style scoped lang="scss" src="~scssAsset/account/bank-card-list.scss"></style>
