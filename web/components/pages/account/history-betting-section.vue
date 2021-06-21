<template>
  <div class="history-betting-section">
    <b-tabs
      :value="activeTab"
      lazy
      @input="activeTab = $event || 0"
    >
      <b-tab title="LỊCH SỬ CƯỢC">
        <HistoryBetting />
      </b-tab>
      <b-tab title="LỊCH SỬ GAME VÍ PHỤ">
        <HistorySport />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>

import HistoryBetting from '~account/history-betting'
import HistorySport from '~account/history-sport'

export default {
  components: {
    HistoryBetting,
    HistorySport
  },
  data () {
    return {
      activeTab: 0,
      tabEnum: {
        betting: 0,
        sport: 1
      }
    }
  },
  watch: {
    activeTab (tab) {
      for (const [key, value] of Object.entries(this.tabEnum)) {
        if (tab === value) {
          this.$router.replace({ query: { tab: 'history-betting', type: key } }).catch(() => {})
        }
      }
    },
    '$route.query': {
      handler (value) {
        this.activeTab = this.tabEnum[value.type] || 0
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/pages/account/history-betting-section.scss">
</style>
