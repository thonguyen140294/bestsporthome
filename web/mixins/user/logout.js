import USER_API from '~/api/user'
import globalMixin from '~/mixins/global-mixin'

export default {
  mixins: [globalMixin],
  methods: {
    async $_logoutMixin_logout () {
      await this.$axios.$get(USER_API.LOG_OUT)
      this.unSubscribeWallet()
      this.$store.commit('resetStore')
      window.history.pushState({}, null, '/')
      location.href = '/'
    }
  }
}
