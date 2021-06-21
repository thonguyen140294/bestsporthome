<template>
  <ModalUser :config="config">
    <template #bg-image>
      <div class="login-bg">
        <div class="login-man"></div>
      </div>
    </template>
    <template #title>
      ĐĂNG NHẬP
    </template>
    <template #title-mobile>
      ĐĂNG NHẬP TÀI KHOẢN
    </template>
    <template #content>
      <div class="login-form" @keyup.enter="submit()">
        <BaseInput
          ref="username"
          v-model="formData.username"
          type="text"
          name="username"
          required
          label="Tên đăng nhập"
          :min-length="6"
          :max-length="30"
          :limit-input="30"
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
        <div v-if="$device.isMobile">
          <BaseCheckbox v-model="formData.saveUsername" :items="checkboxOptions" />
          <BaseButton class="mt-1 mb-1" width="100%" class-name="base-button--bg-red" :loading-button="isLoading" @click="submit()">ĐĂNG NHẬP</BaseButton>
          <BaseButton v-b-modal.modalRegister class="mb-1" width="100%" class-name="base-button--bg-yellow">ĐĂNG KÝ MỚI</BaseButton>
          <p v-b-modal.modalForgotPassword class="login-form__forget-pass">
            <img :src="require('~imageAsset/user/block.svg')" alt="">
            <span>Quên mật khẩu</span>
          </p>
        </div>
        <div v-else>
          <div class="login-form__remember">
            <BaseCheckbox v-model="formData.saveUsername" :items="checkboxOptions" />
          </div>
          <BaseButton class="mt-1 mb-1" width="100%" class-name="base-button--bg-red" :loading-button="isLoading" @click="submit()">ĐĂNG NHẬP</BaseButton>
          <div class="login-form__register-action">
            <BaseButton v-b-modal.modalRegister class="mb-1" width="100%" class-name="base-button--bg-yellow">ĐĂNG KÝ MỚI</BaseButton>
          </div>
          <p v-b-modal.modalForgotPassword class="login-form__forget-pass">
            <img :src="require('~imageAsset/user/block.svg')" alt="">
            <span>Quên mật khẩu</span>
          </p>
        </div>
      </div>
    </template>
  </ModalUser>
</template>

<script>
import { mapState } from 'vuex'
import validateMixin from '~/mixins/validate'
import loginMixin from '~/mixins/user/login'
import { MODAL } from '~/config/constant'
import ModalUser from '~common/modal-user'
import BaseButton from '~common/base-button'
import BaseInput from '~common/base-input'
import BaseCheckbox from '~common/base-checkbox'

export default {
  components: {
    ModalUser,
    BaseButton,
    BaseInput,
    BaseCheckbox
  },
  mixins: [validateMixin, loginMixin],
  data () {
    return {
      formData: {
        username: '',
        password: '',
        saveUsername: 0
      },
      checkboxOptions: [
        { label: 'Ghi nhớ tên đăng nhập', value: 0 }
      ],
      config: {
        id: MODAL.LOGIN,
        class: 'modal--type1 modal--login'
      },
      isLoading: false
    }
  },
  computed: {
    ...mapState(['userName'])
  },
  mounted () {
    this.formData.username = this.userName
  },
  methods: {
    submit () {
      const refs = ['username', 'password']
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }
      this.$_loginMixin_login()
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/user/login-form.scss"></style>
