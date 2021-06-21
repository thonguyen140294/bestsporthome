import { mapState } from 'vuex'
import { MODAL } from '~/config/constant'
import modalMixin from '~/mixins/user/modal'

export default {
  mixins: [modalMixin],
  computed: {
    ...mapState(['showModalLogin', 'showModalRegister'])
  },
  watch: {
    $route () {
      if (this.showModalLogin) {
        this.$_modalMixin_openModal(MODAL.LOGIN)
        this.$store.commit('updateModalLogin', false)
      }
      if (this.showModalRegister) {
        this.$_modalMixin_openModal(MODAL.REGISTER)
        this.$store.commit('updateModalRegister', false)
      }
    }
  },
  mounted () {
    const queryModal = this.$getRoute(this.$route).query.m
    if (queryModal) {
      if (queryModal === 'login') {
        this.$store.commit('updateModalLogin', true)
      }
      if (queryModal === 'register') {
        this.$store.commit('updateModalRegister', true)
      }
      this.$router.push('/')
    }
  }
}
