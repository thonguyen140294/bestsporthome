<template>
  <ModalUser :config="config">
    <template #title>
      ĐĂNG KÝ
    </template>
    <template #title-mobile>
      ĐĂNG KÝ TÀI KHOẢN
    </template>
    <template #content>
      <div class="register-form" @keyup.enter="submit()">
        <BaseInput
          ref="username"
          v-model="formData.username"
          type="text"
          name="username"
          required
          label="Tên đăng nhập"
          :min-length="6"
          :max-length="29"
          :limit-input="29"
          :special-character="true"
        />
        <BaseInput
          ref="password"
          v-model="formData.password"
          type="password"
          name="password"
          required
          label="Mật khẩu"
          :max-length="32"
          :min-length="6"
          :limit-input="32"
        />
        <BaseInput
          ref="confirmPassword"
          v-model="formData.confirmPassword"
          type="password"
          name="confirmPassword"
          required
          :same-as="formData.password"
          label="Xác nhận lại mật khẩu"
          placeholder="Nhập lại mật khẩu"
          :max-length="32"
          :min-length="6"
          :limit-input="32"
        />
        <BaseInput
          ref="phoneNumber"
          v-model="formData.phoneNumber"
          type="tel"
          name="phoneNumber"
          required
          label="Số điện thoại"
          :max-length="11"
          :min-length="10"
          :limit-input="11"
        />
        <BaseButton class="mt-1 mb-1" width="100%" class-name="base-button--bg-red" :loading-button="isLoading" @click="submit()">ĐĂNG KÝ</BaseButton>
        <BaseButton v-if="$device.isMobile" v-b-modal.modalLogin class="mb-1" width="100%" class-name="base-button--bg-yellow">ĐĂNG NHẬP</BaseButton>
        <div v-else class="register-form__login-action">
          <BaseButton v-b-modal.modalLogin class="mb-1" width="100%" class-name="base-button--bg-yellow">ĐĂNG NHẬP</BaseButton>
        </div>
      </div>
    </template>
  </ModalUser>
</template>

<script>
import validateMixin from '~/mixins/validate'
import registerMixin from '~/mixins/user/register'
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
  mixins: [validateMixin, registerMixin],
  data () {
    return {
      formData: {
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
      },
      config: {
        id: MODAL.REGISTER,
        class: 'modal--type1 modal--register'
      },
      isLoading: false
    }
  },
  methods: {
    submit () {
      const refs = ['username', 'password', 'confirmPassword', 'phoneNumber']
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }
      this.$_registerMixin_register()
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/user/register-form.scss"></style>
