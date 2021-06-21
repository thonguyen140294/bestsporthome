<template>
  <div class="quick-register-form">
    <h3>ĐĂNG KÝ NGAY !!!</h3>
    <div class="quick-register-form__wrap">
      <div class="quick-register-form__group">
        <div class="quick-register-form__user">
          <BaseInput
            ref="username"
            v-model="formData.username"
            type="text"
            name="usernameRegis"
            class-name="base-input--type-2"
            required
            label="Tên đăng nhập"
            placeholder="Tên đăng nhập"
            :min-length="6"
            :max-length="29"
            :limit-input="29"
            :special-character="true"
          />
          <BaseInput
            ref="password"
            v-model="formData.password"
            type="text"
            name="passregis"
            class-name="base-input--type-2 quick-regis-pass"
            required
            label="Mật khẩu"
            placeholder="Mật khẩu"
            :max-length="32"
            :min-length="6"
            :limit-input="32"
          >
            <div class="eye-pass" @click="togglePassword"></div>
          </BaseInput>
        </div>
        <BaseInput
          ref="phoneNumber"
          v-model="formData.phoneNumber"
          type="tel"
          name="numberphone"
          class="w-100 mb-0"
          class-name="base-input--type-2"
          required
          label="Số điện thoại"
          placeholder="Số điện thoại"
          :max-length="11"
          :min-length="10"
          :limit-input="11"
        />
      </div>
      <div class="quick-register-form__btn">
        <BaseButton
          center
          medium
          bg-blue-gradient
          full-width
          :loading-button="isLoading"
          class-name="base-button--quick-register"
          @click="submit"
        >
          ĐĂNG KÝ
          <img class="quick-register-form__register-icon" alt="Register icon" :src="require('~imageAsset/common/base-button/register.svg')">
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import validateMixin from '~/mixins/validate'
import registerMixin from '~/mixins/user/register'
import BaseButton from '~common/base-button'
import BaseInput from '~common/base-input'

export default {
  components: {
    BaseInput,
    BaseButton
  },
  mixins: [validateMixin, registerMixin],
  data () {
    return {
      formData: {
        username: '',
        password: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    submit () {
      const refs = ['username', 'password', 'phoneNumber']
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }
      this.$_registerMixin_register()
    },
    togglePassword () {
      $('.eye-pass').toggleClass('show')
      $('input[name=passregis]').toggleClass('display-pass')
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/user/quick-register-form.scss"></style>
