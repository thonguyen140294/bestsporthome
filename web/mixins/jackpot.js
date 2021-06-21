import { refineJackpotData } from '~/helper/jackpot-util'

export default {
  computed: {
    jackpot () {
      return this.$store.state.jackpot
    }
  },
  methods: {
    $_jackpotMixin_formatToPrice (value) {
      return this.$options.filters.formatMoney(value.toFixed(0))
    },
    $_jackpotMixin_getJackpot (gameId) {
      if (gameId) {
        return this.jackpot[gameId.replace('_', '')]
      }
      return 0
    },
    async $_jackpotMixin_GetListJackpot () {
      try {
        const response = await this.$axios.$get('/jackpot')
        if (response.data) {
          const jackpotObj = response.data[0]
          const storeJackpot = refineJackpotData(jackpotObj)
          this.$store.commit('setJackpot', storeJackpot)
        }
      } catch (e) {
        return false
      }
    }
  }
}
