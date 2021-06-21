<template>
  <div class="base-input" :class="[className, { 'base-input--password': type === 'password' }]">
    <div
      v-if="inputType !== 'textarea'"
      class="base-input__wrap"
      :class="{ 'focused': isFocus || currentValue, 'input-error': $v.currentValue.$error }"
    >
      <MaskedInput
        ref="mark"
        v-model.trim="currentValue"
        :mask="inputType === 'tel' || inputType === 'number' ? numberMask :false"
        :type="inputType"
        :name="name"
        :maxlength="limitInput"
        :disabled="disabled"
        :placeholder="formatPlaceholder"
        @blur="onBlur()"
        @focus="onFocus()"
      />
      <label>{{ label }}</label>
      <img v-if="disabled" :src="require('~imageRoot/icons/block.svg')" alt="block" class="icon-block">
      <i v-else-if="type === 'password'" class="eye" :class="{ 'show': isShowPassword }" @click="togglePassword()" />
      <slot />
    </div>
    <div
      v-else
      class="base-input__wrap base-input__wrap--reverse"
      :class="{ 'focused': isFocus || currentValue, 'input-error': $v.currentValue.$error }"
    >
      <textarea
        v-model.trim="currentValue"
        :name="name"
        v-bind="$attrs"
        :placeholder="formatPlaceholder"
        @blur="onBlur()"
        @focus="onFocus()"
      ></textarea>
      <label>{{ label }}</label>
    </div>
    <em v-if="$v.currentValue.$error" class="error" :class="classError">
      <template v-if="!$v.currentValue.required">{{ formatErrorRequired }}</template>
      <template v-else-if="!$v.currentValue.minLength">{{ formatErrorMinLength }}</template>
      <template v-else-if="!$v.currentValue.maxLength">{{ formatErrorMaxLength }}</template>
      <template v-else-if="!$v.currentValue.minValue">{{ formatErrorMinValue }}</template>
      <template v-else-if="!$v.currentValue.maxValue">{{ formatErrorMaxValue }}</template>
      <template v-else-if="!$v.currentValue.email">{{ formatErrorEmail }}</template>
      <template v-else-if="!$v.currentValue.sameAs">{{ formatErrorSameAs }}</template>
      <template v-else-if="!$v.currentValue.specialCharacter">{{ formatErrorSpecicalCharacter }}</template>
    </em>
    <p v-if="toVnd" class="base-input__vnd">= {{ toVdnAmount }} VNĐ</p>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { required, maxLength, minLength, helpers, sameAs } from 'vuelidate/lib/validators'
import MaskedInput from 'vue-text-mask'
import { REGEX_EMAIL } from '~/config/constant'

const specialCharacter = helpers.regex('specialCharacter', /^[a-zA-Z0-9_]*$/)
const validEmail = helpers.regex('validEmail', REGEX_EMAIL)

export default {
  components: {
    MaskedInput
  },
  mixins: [validationMixin],
  model: {
    prop: 'inputValue',
    event: 'input'
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    toVnd: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    inputValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    blurValidate: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: undefined
    },
    minLength: {
      type: Number,
      default: undefined
    },
    maxValue: {
      type: Number,
      default: undefined
    },
    minValue: {
      type: Number,
      default: undefined
    },
    limitInput: {
      type: Number,
      default: undefined
    },
    thousandsSeparatorSymbol: {
      type: String,
      default: ''
    },
    specialCharacter: {
      type: Boolean,
      default: false
    },
    sameAs: {
      type: String,
      default: ''
    },
    classError: {
      type: String,
      default: ''
    },
    errorRequired: {
      type: String,
      default: ''
    },
    errorMinLength: {
      type: String,
      default: ''
    },
    errorMaxLength: {
      type: String,
      default: ''
    },
    errorMinValue: {
      type: String,
      default: ''
    },
    errorMaxValue: {
      type: String,
      default: ''
    },
    errorSpecialCharacter: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      numberMask: createNumberMask({
        prefix: '',
        suffix: '',
        integerLimit: this.limitInput,
        thousandsSeparatorSymbol: this.thousandsSeparatorSymbol,
        allowLeadingZeroes: true
      }),
      isShowPassword: false,
      isFocus: false,
      inputType: this.type
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.inputValue
      },
      set (value) {
        if (!this.disabled) {
          this.$emit('input', value)
        }
      }
    },
    toVdnAmount () {
      return this.$options.filters.formatMoney(this.currentValue, 1000)
    },
    formatPlaceholder () {
      return this.placeholder ? this.placeholder : `Nhập ${this.label ? this.label.toLowerCase() : ''}`
    },
    formatErrorRequired () {
      return this.errorRequired ? this.errorRequired : `Vui lòng nhập ${this.label ? this.label.toLowerCase() : ''}`
    },
    formatErrorMinLength () {
      return this.errorMinLength ? this.errorMinLength : `Vui lòng không nhập ít hơn ${this.minLength} ${this.type === 'tel' || this.type === 'number' ? 'chữ số' : 'ký tự'}`
    },
    formatErrorMaxLength () {
      return this.errorMaxLength ? this.errorMaxLength : `Vui lòng không nhập nhiều hơn ${this.maxLength} ${this.type === 'tel' || this.type === 'number' ? 'chữ số' : 'ký tự'}`
    },
    formatErrorMinValue () {
      return this.errorMinValue ? this.errorMinValue : `${this.label} tối thiểu là ${this.minValue}`
    },
    formatErrorMaxValue () {
      return this.errorMaxValue ? this.errorMaxValue : `${this.label} tối đa là ${this.maxValue}`
    },
    formatErrorEmail () {
      return this.errorEmail ? this.errorEmail : 'Địa chỉ email không hợp lệ'
    },
    formatErrorSameAs () {
      return this.errorSameAs ? this.errorSameAs : `${this.label} không trùng khớp`
    },
    formatErrorSpecicalCharacter () {
      return this.errorSpecialCharacter ? this.errorSpecialCharacter : `${this.label} không chứa các ký tự đặc biệt`
    }
  },
  watch: {
    currentValue (value) {
      if (value.length > this.limitInput) {
        let amount = this.$options.filters.formatMarkToNumber(value.slice(0, this.limitInput), 1)
        amount = this.$options.filters.formatMoney(amount)
        this.currentValue = amount
      }
    }
  },
  validations () {
    return {
      currentValue: {
        required: this.required ? required : true,
        maxLength: this.maxLength ? maxLength(this.maxLength) : true,
        minLength: this.minLength ? minLength(this.minLength) : true,
        specialCharacter: this.specialCharacter ? specialCharacter : true,
        minValue: (value) => {
          const amount = this.$options.filters.formatMarkToNumber(value)
          return this.minValue ? amount >= this.minValue : true
        },
        maxValue: (value) => {
          const amount = this.$options.filters.formatMarkToNumber(value)
          return this.maxValue ? amount <= this.maxValue : true
        },
        email: this.type === 'email' ? validEmail : true,
        sameAs: this.sameAs ? sameAs(() => this.sameAs) : true
      }
    }
  },
  methods: {
    validate () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        return this.currentValue
      }
    },
    resetValidate () {
      this.$v.$reset()
    },
    onBlur () {
      this.isFocus = false
      if (this.blurValidate) {
        this.$v.$touch()
      }
    },
    onFocus () {
      this.isFocus = true
    },
    togglePassword () {
      this.isShowPassword = !this.isShowPassword
      this.inputType = this.isShowPassword ? 'text' : 'password'
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/common/base/base-input.scss"></style>
