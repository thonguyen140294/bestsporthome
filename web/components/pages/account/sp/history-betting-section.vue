<template>
  <div class="history-betting-section">
    <WrapperAccount :title="currentTab.title" @back="$router.push('/account')">
      <v-component :is="currentTab.component" />
    </WrapperAccount>
  </div>
</template>

<script>
import WrapperAccount from './wrapper-account'
import HistoryBetting from '~account/sp/history-betting'
import HistorySport from '~account/sp/history-sport'

export default {
  components: {
    WrapperAccount,
    HistoryBetting,
    HistorySport
  },
  props: {
    tabInfo: {
      type: Object,
      default: () => {}
    }
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
  computed: {
    tabs () {
      return [
        {
          type: 'betting',
          tab: 0,
          title: 'Lịch sử cá cược',
          component: HistoryBetting
        },
        {
          type: 'sport',
          tab: 1,
          title: 'LỊCH SỬ GAME VÍ PHỤ',
          component: HistorySport
        }
      ]
    },
    currentTab () {
      return this.tabs.find(item => item.tab === this.activeTab) || {}
    }
  },
  watch: {
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
