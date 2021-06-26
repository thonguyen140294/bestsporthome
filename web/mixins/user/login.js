import USER_API from '~/api/user'
import globalMixin from '~/mixins/global-mixin'
import modalMixin from '~/mixins/user/modal'
import promotionMixin from '~/mixins/promotion'

export default {
  mixins: [globalMixin, modalMixin, promotionMixin],
  methods: {
    async $_loginMixin_login (redirect = null) {
      this.$_globalMixin_loading()
      try {
        // Setting new data for new User
        // let response = null
        // response = await this.$axios.$post(USER_API.LOG_IN, { ...this.formData })
        this.$_globalMixin_load()
        // this.$store.commit('currentUser', response.data)
				this.$store.commit('currentUser', {
					username: 'aaa',
					fullname: 'bbb',
					contactName: 'ccc',
					phone: '0123456789',
					email: 'abc@gmail.com',
					token: '123asdqwe'
				})
        this.$_loginMixin_reset()
        this.$_modalMixin_closeButton()
        this.$_modalMixin_closeModal('modalLogin')
        if (redirect) {
          window.location.href = redirect
        }
      } catch (error) {
        this.$showError({ error })
        this.$_globalMixin_load()
      }
    },
    $_loginMixin_reset () {
      this.formData = {
        username: '',
        password: ''
      }
    }
  }
}
