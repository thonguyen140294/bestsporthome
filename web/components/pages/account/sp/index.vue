<template>
  <WrapperAccount v-if="activeTab === undefined" is-base @back="$router.push('/')">
    <MenuInfo />
  </WrapperAccount>
  <v-component :is="currentTab.component" v-else :tab-info="currentTab" />
</template>

<script>
import WrapperAccount from './wrapper-account'
import MenuInfo from './menu-info'
import InfoAccountSection from './info-account-section'
import HistoryTransactionSection from './history-transaction-section'

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
          title: 'Thông tin cá nhân',
          component: InfoAccountSection
        },
        {
          title: 'Lịch sử giao dịch',
          component: HistoryTransactionSection
        }
      ],
      tabEnum: {
        'account-info': 0,
        'history-transaction': 1
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
