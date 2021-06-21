export const state = () => ({
  selectedProvider: 'all'
})

export const mutations = {
  selectedProvider (state, provider) {
    state.selectedProvider = provider || 'all'
  },
  resetProvider (state) {
    state.selectedProvider = 'all'
  }
}
