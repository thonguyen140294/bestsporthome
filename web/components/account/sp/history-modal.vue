<template>
  <b-modal
    :id="config.id"
    :modal-class="config.class"
    hide-header
    hide-footer
    no-close-on-esc
    no-close-on-backdrop
    ok-only
    no-fade
  >
    <div class="history-modal">
      <div class="history-modal__title">
        <h3 class="history-modal__hdg">
          <slot name="title" />
        </h3>
        <a href="#" class="history-modal__cta-close" @click="hideModal">
          <img :src="require('~imageAsset/account/sp/close.svg')" alt="">
        </a>
      </div>
      <div class="history-modal__content">
        <slot name="content" />
      </div>
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

<style lang="scss" scoped src="~scssAsset/account/sp/history-modal.scss"></style>
