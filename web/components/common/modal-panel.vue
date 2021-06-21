<template>
  <b-modal
    :id="config.id"
    :modal-class="config.class"
    hide-header
    hide-footer
    no-close-on-esc
    ok-only
    no-fade
  >
    <div class="modal-panel">
      <slot name="content" />
    </div>
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

<style lang="scss" scoped src="~scssAsset/common/modal-panel.scss"></style>
