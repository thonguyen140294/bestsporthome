<template>
  <div class="momo-list">
    <div class="momo-list__wrap">
      <div v-for="(item, index) in momos" :key="item.account_no" class="momo-item">
        <input
          :id="item.account_no"
          v-model="currentValue"
          type="radio"
          name="momo-list"
          :value="item.account_no"
          :checked="item.account_no === currentValue"
        >
        <label :for="item.account_no">
          <img :src="require('~imageAsset/account/momo-list/momo.png')" :alt="item.bank_code">
          <div class="momo-item__content">
            <p>Tài khoản MOMO{{ index + 1 }}</p>
            <b>{{ item.bank_name }}</b>
          </div>
        </label>
      </div>
    </div>
    <em v-if="$v.currentValue.$error" class="error">
      <template v-if="!$v.currentValue.required">Vui lòng chọn tài khoản MOMO</template>
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
    momos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.inputValue ? this.inputValue.account_no : ''
      },
      set (value) {
        const selected = this.momos.find(item => item.account_no === value)
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

<style scoped lang="scss" src="~scssAsset/account/momo-list.scss"></style>
