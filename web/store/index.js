import { isCacheCrawlerAgent, isBotChromeLighthouse } from '../helper'

export const state = () => ({
  globalMainBalance: 0,
  globalSubBalance: 0,
  globalTotalBalance: 0,
  currentUser: null,
  banks: [],
  userBanks: [],
  momos: [],
  telecoms: [],
  packages: [],
  promotion: {},
  refreshInterval: null,
  jackpot: {},
  device: 'desktop',
  userName: '',
  showModalLogin: false,
  showModalRegister: false,
  isCacheCrawlerAgent: false,
  isBotChromeLighthouse: false
})

export const getters = {
  isLogged (state) {
    return !!state.currentUser
  },
  imageAvatar (state) {
    const avatar = state.currentUser?.avatar
    return avatar ? require(`~imageAsset/layouts/header/login-user/avatar${avatar}.png`) : ''
  }
}

export const mutations = {
  updatePromotion (state, payload) {
    state.promotion = payload
  },
  updateUserName (state, data) {
    state.userName = data
  },
  resetStore (state) {
    state.globalMainBalance = 0
    state.globalSubBalance = 0
    state.globalTotalBalance = 0
    state.currentUser = null
    state.banks = []
    state.userBanks = []
    state.momos = []
    state.telecoms = []
    state.packages = []
    state.promotion = {}
    state.refreshInterval = null
    state.jackpot = {}
    state.showModalLogin = false
    state.showModalRegister = false
    this.$cookies.set('currentUser', null)
  },
  updateModalLogin (state, data) {
    state.showModalLogin = data
  },
  updateModalRegister (state, data) {
    state.showModalRegister = data
  },
  updateBalance (state, data) {
    state.globalMainBalance = data
  },
  updateSubBalance (state, data) {
    state.globalSubBalance = data
  },
  updateTotalBalance (state, data) {
    state.globalTotalBalance = data
  },
  updateUserBanks (state, payload) {
    state.userBanks = payload
  },
  updateBanks (state, payload) {
    state.banks = payload
  },
  updateMomos (state, payload) {
    state.momos = payload
  },
  updateTelecoms (state, payload) {
    state.telecoms = payload
  },
  updatePackages (state, payload) {
    state.packages = payload
  },
  currentUser (state, payload) {
    if (payload) {
      const balanceSub = payload.balanceSub || 0
      state.currentUser = {
        ...state.currentUser,
        ...payload,
        balanceSub,
        tempBalance: state.currentUser ? state.currentUser.tempBalance : payload.balance,
        tempBalanceSub: state.currentUser ? state.currentUser.tempBalanceSub : payload.balanceSub
      }
      this.$cookies.set('currentUser', { id: payload.id, package_id: payload.package_id })
    } else {
      state.currentUser = null
      this.$cookies.set('currentUser', null)
    }
  },
  setJackpot (state, jackpot) {
    state.jackpot = jackpot
  },
  mutate (state, payload) {
    state[payload.property] = typeof payload.with === 'object' && payload.with !== null ? { ...state[payload.property], ...payload.with } : payload.with
  }
}

export const actions = {
  nuxtServerInit ({ commit }, {
    app, req
  }) {
    // Detect crawling from bot google cache and lighthouse
    // to determine show all components or show lazy
    const userAgent = req.headers['user-agent']
    if (isCacheCrawlerAgent(userAgent)) {
      commit('mutate', {
        property: 'isCacheCrawlerAgent',
        with: true
      })
    }
    if (isBotChromeLighthouse(userAgent)) {
      commit('mutate', {
        property: 'isBotChromeLighthouse',
        with: true
      })
    }

    const currentUser = app.$cookies.get('currentUser', { parseJSON: true })
    if (currentUser) {
      commit('currentUser', currentUser)
    } else {
      commit('currentUser', null)
    }
  },
  socketUnSubscribeWallet () {
    const token = this.state.currentUser.token
    const uid = this.state.currentUser.id
    this._vm.$socket.client.emit('unSubscribeWallet', { userId: uid, token })
  }
}
