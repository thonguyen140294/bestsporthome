<template>
  <ModalUser :config="config">
    <template #bg-image>
      <div class="signup-bg">
        <div class="signup-man"></div>
      </div>
    </template>
    <template #title>
      QUÊN MẬT KHẨU
    </template>
    <template #title-mobile>
      QUÊN MẬT KHẨU
    </template>
    <template #content>
      <div class="register-form">
        <BaseInput
          ref="email"
          v-model="formData.email"
          type="email"
          name="email"
          required
          label="Email đăng ký"
          placeholder="Nhập email đã đăng ký"
          :limit-input="50"
        />
        <BaseButton class="mt-1 mb-1 mb-md-2" width="100%" class-name="base-button--bg-red base-button--uppercase" :loading-button="isLoading" @click="submit()">KHÔI PHỤC LẠI MẬT KHẨU</BaseButton>
        <BaseButton v-b-modal.modalLogin class="mb-1" width="100%" class-name="base-button--bg-gray-type2">TRỞ LẠI ĐĂNG NHẬP</BaseButton>
      </div>
    </template>
  </ModalUser>
</template>

<script>
import validateMixin from '~/mixins/validate'
import forgotPasswordMixin from '~/mixins/user/forgot-passwod'
import { MODAL } from '~/config/constant'
import ModalUser from '~common/modal-user'
import BaseButton from '~common/base-button'
import BaseInput from '~common/base-input'

export default {
  components: {
    ModalUser,
    BaseButton,
    BaseInput
  },
  mixins: [validateMixin, forgotPasswordMixin],
  data () {
    return {
      formData: {
        email: ''
      },
      config: {
        id: MODAL.FORGOT_PASSWORD,
        class: 'modal--type1 modal--register'
      },
      isLoading: false
    }
  },
  methods: {
    submit () {
      const refs = ['email']
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }
      this.$_forgotPasswordMixin_forgot()
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/user/register-form.scss"></style>
