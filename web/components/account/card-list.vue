<template>
  <div class="card-list">
    <div class="card-list__wrap">
      <div v-for="item in telecoms" :key="item.telco" class="card-item">
        <input
          :id="item.telco"
          v-model="currentValue"
          type="radio"
          name="card-list"
          :value="item.telco"
          :checked="item.telco === currentValue"
        >
        <label :for="item.telco">
          <template v-if="item.telco === currentValue">
            <img
              :src="require(`~imageAsset/account/card-list/${item.telco.toLowerCase()}.svg`)"
              :alt="item.bank_name"
            >
          </template>
          <template v-else>
            <img
              :src="require(`~imageAsset/account/card-list/${item.telco.toLowerCase()}_gray.svg`)"
              :alt="item.bank_name"
            >
          </template>
        </label>
      </div>
    </div>
    <em v-if="$v.currentValue.$error" class="error">
      <template v-if="!$v.currentValue.required">Vui lòng chọn nhà mạng</template>
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
    telecoms: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.inputValue ? this.inputValue.telco : ''
      },
      set (value) {
        const selected = this.telecoms.find(item => item.telco === value)
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

<style scoped lang="scss" src="~scssAsset/account/card-list.scss"></style>
