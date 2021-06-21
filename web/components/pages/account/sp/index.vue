<template>
  <WrapperAccount v-if="activeTab === undefined" is-base @back="$router.push('/')">
    <MenuInfo />
  </WrapperAccount>
  <v-component :is="currentTab.component" v-else :tab-info="currentTab" />
</template>

<script>
import WrapperAccount from './wrapper-account'
import MenuInfo from './menu-info'
import DepositSection from './deposit-section'
import WithDrawSection from './withdraw-section'
import InfoAccountSection from './info-account-section'
import HistoryTransactionSection from './history-transaction-section'
import HistoryBettingSection from './history-betting-section'

export default {
  components: {
    WrapperAccount,
    MenuInfo
  },
  data () {
    return {
      activeTab: undefined,
      tabs: [
        {
          title: 'Chọn phương thức nạp',
          component: DepositSection
        },
        {
          title: 'Chọn phương thức RÚT',
          component: WithDrawSection
        },
        {
          title: 'Thông tin cá nhân',
          component: InfoAccountSection
        },
        {
          title: 'Lịch sử giao dịch',
          component: HistoryTransactionSection
        },
        {
          title: 'Lịch sử cá cược',
          component: HistoryBettingSection
        }
      ],
      tabEnum: {
        deposit: 0,
        withdraw: 1,
        'account-info': 2,
        'history-transaction': 3,
        'history-betting': 4
      }
    }
  },
  computed: {
    currentTab () {
      return this.tabs[this.activeTab] || {}
    }
  },
  watch: {
    '$route.query.tab': {
      handler (value) {
        this.activeTab = this.tabEnum[value]
      },
      immediate: true
    }
  }
}
</script>
