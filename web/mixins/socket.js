import { mapState } from 'vuex'
import get from 'lodash/get'
import has from 'lodash/has'
import { refineJackpotData } from '~/helper/jackpot-util'

export default {
  data: () => ({
    balance: null
  }),
  computed: {
    ...mapState({
      uid: state => state.currentUser && state.currentUser.id,
      token: state => state.currentUser && state.currentUser.token
    })
  },
  watch: {
    token (value) {
      if (value) {
        this.subscribeWallet()
        this.subscribeUserPlan()
      } else {
        this.unSubscribeWallet()
        this.unSubscribeUserPlan()
      }
    },
    $route () {
      if (this.$route.matched.some(({ name }) => name === 'home') ||
        this.$route.matched.some(({ name }) => name === 'lobby')) {
        this.subscribeJackpot()
      } else {
        this.unJackpot()
      }
    }
  },
  methods: {
    updateUserBalance (balanceData) {
      const newGpBalance = get(balanceData, 'gpWalletData[0].balance', 0)
      this.$store.commit('updateSubBalance', Math.floor(newGpBalance))
      if (has(balanceData, 'data[0].balance')) {
        const newBalance = get(balanceData, 'data[0].balance', 0)
        this.$store.commit('updateBalance', Math.floor(newBalance))
        this.$store.commit('updateTotalBalance', Math.floor(newGpBalance) + Math.floor(newBalance))
      }
    },
    updateJackpotData (jackpotData) {
      const jackpotObj = jackpotData.data ? jackpotData.data[0] : null
      if (jackpotObj) {
        const storeJackpot = refineJackpotData(jackpotObj)
        this.$store.commit('setJackpot', storeJackpot)
      }
    },
    async updateMaintenanceData (data) {
      await this.$store.dispatch('maintenance/updateMaintenance', data)
      this.$cookies.set('maintenance_data', data)
    },
    subscribeWallet () {
      this.$socket.client.emit('subscribeWallet', { userId: this.uid, token: this.token })
    },
    unSubscribeWallet () {
      this.$socket.client.emit('unSubscribeWallet', { userId: this.uid, token: this.token })
    },
    subscribeUserPlan () {
      this.$socket.client.emit('subscribeUserPlan', { userId: this.uid, token: this.token })
    },
    unSubscribeUserPlan () {
      this.$socket.client.emit('unSubscribeUserPlan', { userId: this.uid, token: this.token })
    },
    subscribeJackpot () {
      this.$socket.client.emit('subscribeJackpot')
    },
    unJackpot () {
      this.$socket.client.emit('unSubscribeJackpot')
    },
    subscribeInformation () {
      this.$socket.client.emit('subscribeInformation')
    }
  },
  mounted () {
    if (this.token) {
      this.subscribeWallet()
      this.subscribeUserPlan()
    }

    this.subscribeInformation()
  },
  sockets: {
    connect () {
      this.$socket.client.emit('authenticate', { token: this.token })
    },
    message (message) {
      if (!message || !message.data || parseInt(message.data.code, 10) === 401 || message.data.code === 'rest_forbidden' || message.error) {
        this.unSubscribeWallet()
        this.unSubscribeUserPlan()
        this.$showError({
          error: message && message.error && message.error.code === 404 ? 'Tài khoản được đăng nhập trên thiết bị khác' : 'Tài khoản đã hết phiên đăng nhập, vui lòng đăng nhập lại',
          title: 'phiên đăng nhập hết hạn',
          button: 'đăng nhập LẠI',
          url: '/?m=login'
        })
        this.$store.commit('resetStore')
        return
      }

      if (message.code === 200 && message.data) {
        this.updateUserBalance(message)
      }
    },
    plan (message) {
      const { status, data } = message
      if (status === 'OK' && data) {
        this.$store.commit('updatePromotion', data)
      }
    },
    maintenance (data) {
      if (data) {
        this.updateMaintenanceData(data)
      }
    },
    jackpot (message) {
      if (message.code === 200 && message.data) {
        this.updateJackpotData(message)
      }
    },
    disconnect () {

    },
    disconnectUser () {
      this.unSubscribeWallet()
      this.$store.commit('resetStore')
      window.history.pushState({}, null, '/')
      location.href = '/'
    }
  }
}
