<template>
  <div class="base-select" :class="[className]">
    <div class="base-select__wrap" :class="{ focused: currentValue, 'input-error': $v.currentValue.$error }">
      <select :id="name" v-model="currentValue" :name="name" :disabled="disabled">
        <template v-if="!noLabel">
          <option value="">{{ placeholder ? placeholder : label }}</option>
        </template>
        <option v-for="(item, index) in items" :key="index" :value="valueField ? item[valueField] : item">
          {{ textField ? item[textField] : item }}
        </option>
      </select>
      <label :for="name">{{ label }}</label>
    </div>
    <p v-if="$v.currentValue.$error" class="error">
      <template v-if="!$v.currentValue.required">{{ errorRequired ? errorRequired : `Vui lòng chọn ${ label ? label.toLowerCase() : '' }` }}</template>
    </p>
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
      type: [String, Number],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    textField: {
      type: String,
      default: ''
    },
    valueField: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    errorRequired: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    noLabel: {
      type: Boolean,
      default: false
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
    }
  },
  mounted () {

  },
  validations () {
    return {
      currentValue: {
        required: this.required ? required : true
      }
    }
  },
  methods: {
    validate () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        return this.inputValue
      }
    },
    resetValidate () {
      this.$v.$reset()
    }
  }
}
</script>

<style lang="scss" scoped src="static/assets/scss/components/common/base/base-select.scss">
</style>
