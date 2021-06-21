<template>
  <div class="base-checkbox">
    <div v-for="item in items" :key="item.value" class="base-checkbox__wrap">
      <input
        :id="item.label"
        v-model="currentValue"
        type="checkbox"
        :name="name"
        :value="item.value"
        :checked="item.value === currentValue"
      >
      <label :for="item.label" class="base-checkbox__box" />
      <label class="base-checkbox__label" :for="item.label">{{ item.label }}</label>
    </div>
  </div>
</template>

<script>

export default {
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    inputValue: {
      type: [String, Number, Boolean],
      default: null
    },
    items: {
      type: Array,
      default: () => []
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
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/common/base/base-checkbox.scss"></style>
