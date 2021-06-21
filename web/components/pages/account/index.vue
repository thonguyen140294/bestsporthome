<template>
  <div class="account container">
    <div class="account__left">
      <client-only>
        <MenuInfo />
      </client-only>
      <MenuCategory />
    </div>
    <div class="account__right">
      <client-only>
        <b-tabs
          v-model="activeTab"
          vertical
          lazy
          class="account__tabs"
          content-class="account__tab-content"
        >
          <b-tab v-for="(section) in tabs" :key="section.title" lazy>
            <component :is="section.component" />
          </b-tab>
        </b-tabs>
      </client-only>
    </div>
  </div>
</template>

<script>
import DepositSection from './deposit-section'
import WithDrawSection from './withdraw-section'
import HistoryTransactionSection from './history-transaction-section'
import HistoryBettingSection from './history-betting-section'
import InfoAccountSection from './info-account-section'
import MenuInfo from './menu-info'
import MenuCategory from './menu-category'

export default {
  components: {
    MenuInfo,
    MenuCategory
  },
  data () {
    return {
      activeTab: undefined,
      tabs: [
        {
          title: 'Nạp tiền',
          component: DepositSection
        },
        {
          title: 'Rút tiền',
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
  watch: {
    activeTab: {
      handler (tab) {
        this.$nextTick(() => {
          if (tab !== undefined) {
            for (const [key, value] of Object.entries(this.tabEnum)) {
              if (value === tab) {
                this.$router.replace({ query: { tab: key, type: this.$getRoute(this.$route).query.type, package: this.$getRoute(this.$route).query.package } }).catch(() => {})
              }
            }
          } else {
            this.$router.push('/account')
          }
        })
      }
    },
    '$route.query.tab': {
      handler (value) {
        this.activeTab = this.tabEnum[value]
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/account/index.scss">
</style>
