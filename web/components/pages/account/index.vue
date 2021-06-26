<template>
  <div class="account container">
    <div class="account__left">
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
import HistoryTransactionSection from './history-transaction-section'
import InfoAccountSection from './info-account-section'
import MenuCategory from './menu-category'

export default {
  components: {
    MenuCategory
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
          title: 'Lịch sử mua hàng',
          component: HistoryTransactionSection
        },
      ],
      tabEnum: {
        'account-info': 0,
        'history-transaction': 1,
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
