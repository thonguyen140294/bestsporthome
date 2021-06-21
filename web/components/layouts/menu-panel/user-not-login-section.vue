<template>
  <div class="user-not-login-section">
    <BaseButton
      class-name="base-button--bg-red base-button--menu"
      @click="handleOpenModalAuth"
    >
      ĐĂNG KÝ
    </BaseButton>
    <BaseButton
      class-name="base-button--outline-white base-button--menu"
      @click="handleOpenModalAuth('modalLogin')"
    >
      ĐĂNG NHẬP
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from '~common/base-button'
import modalMixin from '~/mixins/user/modal'

export default {
  components: {
    BaseButton
  },
  mixins: [modalMixin],
  methods: {
    handleOpenModalAuth (id = 'modalRegister') {
      this.$_modalMixin_closeAllModal()
      this.$_modalMixin_openModal(id)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/menu-panel/user-not-login-section.scss"></style>
