<template>
  <button
    v-if="!link"
    type="button"
    class="base-button btn"
    :class="[className]"
    :disabled="disabled"
    :style="buttonStyle"
    @click.prevent.stop="clickBtn()"
  >
    <div v-if="loadingButton" class="base-button__loading" :class="[classLoading]">
      <span />
      <span />
      <span />
    </div>
    <div>
      <slot />
    </div>
  </button>
  <a
    v-else
    class="base-button btn"
    :class="[className]"
    :disabled="disabled"
    :style="buttonStyle"
    @click.prevent="$_navigationMixin_navigate(link, requiredLogin, newTab)"
  >
    <div v-if="loadingButton" class="base-button__loading" :class="[classLoading]">
      <span />
      <span />
      <span />
    </div>
    <span>
      <slot />
    </span>
  </a>
</template>

<script>

import navigationMixin from '~/mixins/navigation'

export default {
  mixins: [navigationMixin],
  props: {
    className: {
      type: String,
      default: ''
    },
    classLoading: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: ''
    },
    loadingButton: {
      type: Boolean,
      default: false
    },
    requiredLogin: {
      type: Boolean,
      default: false
    },
    newTab: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: undefined
    },
    height: {
      type: [String, Number],
      default: undefined
    }
  },
  computed: {
    buttonStyle () {
      const width = typeof this.width === 'number' ? `${this.width}px` : this.width
      const height = typeof this.height === 'number' ? `${this.height}px` : this.height
      return { width, height }
    }
  },
  methods: {
    clickBtn () {
      if (!this.isLoading && !this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/common/base/base-button.scss"></style>
