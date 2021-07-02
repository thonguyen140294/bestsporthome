import { mapState } from 'vuex'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'promotion']),
    currentUserFullName () {
      return this.currentUser?.fullname ?? ''
    },
    isLogged () {
      return this.$store.getters.isLogged
    },
    imageAvatar () {
      return this.$store.getters.imageAvatar
    }
  },
  methods: {
    $_globalMixin_loading () {
      this.isLoading = true
    },
    $_globalMixin_load () {
      this.isLoading = false
    }
  }
}
