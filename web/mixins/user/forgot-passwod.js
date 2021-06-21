import USER_API from '~/api/user'
import globalMixin from '~/mixins/global-mixin'
import modalMixin from '~/mixins/user/modal'

export default {
  mixins: [globalMixin, modalMixin],
  methods: {
    async $_forgotPasswordMixin_forgot () {
      this.$_globalMixin_loading()
      try {
        const response = await this.$axios.$post(USER_API.FORGOT_PASSWORD, { ...this.formData })
        this.$_globalMixin_load()
        this.$_modalMixin_openModal('modalLogin')
        this.$showError({
          error: response,
          icon: 'success',
          title: 'THÔNG BÁO'
        })
      } catch (error) {
        this.$showError({ error })
        this.$_globalMixin_load()
      }
    }
  }
}
