import loginMixin from '~/mixins/user/login'

export default {
  mixins: [loginMixin],
  data () {
    return {
      formData: {},
      ignorePaths: ['/reset-password', '/account']
    }
  },
  mounted () {
    const lpToken = this.$getRoute(this.$route).query.token
    const redirect = this.$getRoute(this.$route).query.redirect
    if (lpToken && !this.ignorePaths.includes(this.$getRoute(this.$route).path)) {
      this.$_loginMixin_login(lpToken, redirect)
    }
  }
}
