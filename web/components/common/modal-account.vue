<template>
  <b-modal
    :id="config.id"
    :modal-class="config.class"
    hide-header
    hide-footer
    ok-only
    centered
  >
    <p class="close" @click="hideModal" />
    <slot name="content" />
  </b-modal>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          id: '',
          class: ''
        }
      }
    }
  },
  methods: {
    hideModal () {
      this.$root.$emit('bv::hide::modal', this.config.id)
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/common/modal-account.scss"></style>
