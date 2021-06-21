import dayjs from 'dayjs'
import { isCurrentBetweenStartAndEnd } from '~/helper/maintenance-utils'

export default {
  methods: {
    $_maintainMixin_checkWalletMaintain (startTime, endTime) {
      if (isCurrentBetweenStartAndEnd(startTime, endTime)) {
        this.$store.commit('maintenance/setShowWalletMaintenance', true)
        return true
      }
      return false
    },
    $_maintainMixin_checkMainWalletGame () {
      const startTime = dayjs(this.$store.state.maintenance.maintenance.startTime)
      const endTime = dayjs(this.$store.state.maintenance.maintenance.endTime)
      const isEnabled = isCurrentBetweenStartAndEnd(startTime, endTime)

      if (isEnabled) {
        const maintenance = {
          startTime,
          endTime,
          enabled: isEnabled
        }
        this.$store.commit('maintenance/updateMaintenance', maintenance)
        this.$store.commit('maintenance/setShowWalletMaintenance', false)
        this.$store.commit('maintenance/setShowMaintenance', true)
        return true
      }
      return false
    },
    async $_getMaintenanceData () {
      const { data: response } = await this.$axios.$get('users/maintenance')
      await this.$store.dispatch('maintenance/updateMaintenance', response.data)
    }
  }
}
