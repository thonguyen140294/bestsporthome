import { isCacheCrawlerAgent, isBotChromeLighthouse } from '../helper'

export const state = () => ({
  currentUser: null,
  cart: [],
  device: 'desktop',
  showModalLogin: false,
  showModalRegister: false,
})

export const getters = {
  isLogged (state) {
    return !!state.currentUser
  }
}

export const mutations = {
  resetStore (state) {
    state.currentUser = null
    state.cart = []
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
  currentUser (state, payload) {
    if (payload) {
      state.currentUser = {
        ...state.currentUser,
        ...payload,
      }
    } else {
      state.currentUser = null
      this.$cookies.set('currentUser', null)
    }
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
  }
}
