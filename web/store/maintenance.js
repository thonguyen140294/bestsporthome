import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export const state = () => ({
  maintenance: {
    enabled: false,
    startTime: null,
    endTime: null
  },
  showMaintenance: false,
  showWalletMaintenance: false,
  showGameMaintenance: false
})

export const mutations = {
  updateMaintenance (state, data) {
    state.maintenance = data
  },
  setShowMaintenance (state, data) {
    state.showMaintenance = data
  },
  setShowWalletMaintenance (state, data) {
    state.showWalletMaintenance = data
  },
  setShowGameMaintenance (state, data) {
    state.showGameMaintenance = data
  }
}

export const actions = {
  updateMaintenance ({ commit }, data) {
    if (data) {
      if (data.start_time && data.end_time) {
        const currentTime = dayjs()
        const startTime = dayjs(data.start_time)
        const endTime = dayjs(data.end_time)
        const enabled = currentTime.isBetween(startTime, endTime)

        if (startTime && startTime.isBetween(currentTime, currentTime.add(5, 'm'))) {
          commit('setShowMaintenance', true)
        } else {
          commit('setShowMaintenance', false)
        }
        commit('setShowWalletMaintenance', false)
        commit('updateMaintenance',
          {
            startTime,
            endTime,
            enabled
          })
      } else {
        commit('updateMaintenance',
          {
            startTime: '',
            endTime: '',
            enabled: false
          })
      }
    }
  }
}
