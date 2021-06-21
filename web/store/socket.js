export const state = () => ({
  jackpot: {},
  bigJackpot: {},
  maintenance: {}
})

export const mutations = {
  updateListJackpot (state, data) {
    state.jackpot = data
    state.tokenExpired = false
  },
  updateBigJackpot (state, data) {
    state.bigJackpot = data
  },
  updateMaintenance (state, data) {
    state.maintenance = data
  },
  expireStore (state, data) {
    if (data) {
      state.isLogin = false
      state.updateShowHeaderWallet = false
      state.uName = ''
      state.uFullname = ''
      state.uPhone = ''
      state.token = ''
      state.gptoken = ''
      state.uid = ''
      state.tokenExpired = true
      state.packageId = 0
      state.uuid = ''
    }
  }
}
