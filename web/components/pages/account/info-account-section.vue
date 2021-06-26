<template>
  <div>
    <WrapperAccount title="THÔNG TIN TÀI KHOẢN" no-wrap :tabs="tabs" :active-tab="activeTab" @change='activeTab = $event || 0' />
  </div>
</template>

<script>
import WrapperAccount from '~pages/account/wrapper-account'
import InfoPersonalForm from '~account/info-personal-form'
import globalMixin from '~/mixins/global-mixin'

export default {
  components: {
    WrapperAccount
  },
  mixins: [globalMixin],
  data () {
    return {
      activeTab: 0,
      tabEnum: {
        'info-personal': 0,
      }
    }
  },
  computed: {
    tabs () {
      return [
        {
          title: '1. THÔNG TIN CÁ NHÂN',
          component: InfoPersonalForm
        }
      ]
    }
  },
  watch: {
    activeTab: {
      handler (tab) {
        for (const [key, value] of Object.entries(this.tabEnum)) {
          if (tab === value) {
            this.$router.replace({ query: { tab: 'account-info', type: key } }).catch(() => {})
          }
        }
      }
    },
    '$route.query.type': {
      handler (value) {
        this.activeTab = this.tabEnum[value] || 0
      },
      immediate: true
    }
  }
}
</script>

<style></style>
