import USER_API from '~/api/user'
import globalMixin from '~/mixins/global-mixin'
import modalMixin from '~/mixins/user/modal'
import { isCurrentBetweenStartAndEnd } from '~/helper/maintenance-utils'

export default {
  mixins: [globalMixin, modalMixin],
  methods: {
    async $_registerMixin_register () {
      this.$_globalMixin_loading()
      try {
        const response = await this.$axios.$post(USER_API.REGISTER, { ...this.formData })
        this.$_globalMixin_load()
        response.data.avatar = response.data.login_count % 11 + 1
        response.data.hasBank = false
        this.$store.commit('currentUser', response.data)
        this.$_registerMixin_reset()
        this.$_modalMixin_closeButton()
        this.$_modalMixin_closeModal('modalRegister')
        this.redirectAfterRegister()
      } catch (error) {
        this.$showError({ error })
        this.$_globalMixin_load()
      }
    },
    $_registerMixin_reset () {
      this.formData = {
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
      }
    },
    redirectAfterRegister () {
      const isMaintain = isCurrentBetweenStartAndEnd(
        this.$store.state.maintenance.maintenance.startTime,
        this.$store.state.maintenance.maintenance.endTime
      )

      if (!isMaintain) {
        this.$router.push('/account')
      }
    }
  }
}
