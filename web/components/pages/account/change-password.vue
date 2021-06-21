<template>
  <div class="change-password__bg">
    <div class="change-password__title">
      <h2>ĐỔI MẬT KHẨU MỚI</h2>
      <img :src="require('~imageAsset/user/change-password-line.svg')" alt="">
    </div>
    <div class="container change-password__form" @keyup.enter="submit()">
      <BaseInput
        ref="password"
        v-model="formData.password"
        type="password"
        name="password"
        required
        label="Mật khẩu mới"
        :min-length="6"
        :max-length="32"
        :limit-input="32"
        :special-character="false"
      />
      <BaseInput
        ref="confirmPassword"
        v-model="formData.confirmPassword"
        type="password"
        name="confirmPassword"
        required
        label="Xác nhận lại mật khẩu mới"
        placeholder="Nhập lại mật khẩu mới"
        :max-length="32"
        :min-length="6"
        :limit-input="32"
        :same-as="formData.password"
      />
      <BaseButton class="mt-1 mb-1" width="100%" class-name="base-button--bg-red" :loading-button="isLoading" @click="submit()">CẬP NHẬT</BaseButton>
    </div>
  </div>
</template>

<script>
import validateMixin from '~/mixins/validate'
import changePasswordMixin from '~/mixins/user/change-password'
import BaseButton from '~common/base-button'
import BaseInput from '~common/base-input'

export default {
  components: {
    BaseButton,
    BaseInput
  },
  mixins: [validateMixin, changePasswordMixin],
  data () {
    return {
      formData: {
        password: '',
        confirmPassword: ''
      }
    }
  },
  mounted () {
    if (!this.$route.query.token) {
      this.$router.push('/')
    }
  },
  methods: {
    submit () {
      const refs = ['password', 'confirmPassword']
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }
      this.$_changePasswordMixin_change(this.$route.query.token)
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/user/change-password.scss"></style>
