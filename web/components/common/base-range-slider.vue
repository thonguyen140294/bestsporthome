<template>
  <div class="d-flex">
    <RangeSlider
      ref="slider"
      v-model="currentValue"
      class="base-ranger-slider"
      :class="{'transferring': transferring }"
      step="1"
      :disabled="transferring"
      :max="maxValue"
      @change="$emit('changeSubmit', $event)"
    />
  </div>
</template>

<script>
import 'vue-range-slider/dist/vue-range-slider.css'
import RangeSlider from 'vue-range-slider'
import globalMixin from '@/mixins/global-mixin.js'

export default {
  components: {
    RangeSlider
  },
  mixins: [globalMixin],
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    inputValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 0
    },
    transferring: {
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
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/common/base/base-ranger-slider.scss"></style>
