<template>
  <div>
    <WrapperAccount title="THÔNG TIN TÀI KHOẢN" no-wrap :tabs="tabs" :active-tab="activeTab" @change='activeTab = $event || 0' />
    <PreferentialPackage />
  </div>
</template>

<script>
import WrapperAccount from '~pages/account/wrapper-account'
import InfoPersonalForm from '~account/info-personal-form'
import InfoMyBank from '~account/info-my-bank'
import PreferentialPackage from '~account/preferential-package'
import globalMixin from '~/mixins/global-mixin'
import { AVATAR_ICON } from '~/config/constant'

export default {
  components: {
    WrapperAccount,
    PreferentialPackage
  },
  mixins: [globalMixin],
  data () {
    return {
      activeTab: 0,
      tabEnum: {
        'info-personal': 0,
        'info-bank': 1
      },
      preferentialPackage: PreferentialPackage
    }
  },
  computed: {
    tabs () {
      return [
        {
          title: '1. THÔNG TIN CÁ NHÂN',
          component: InfoPersonalForm
        },
        {
          title: '2. THÔNG TIN NGÂN HÀNG',
          component: InfoMyBank,
          warning: this.currentUser?.hasBank ? AVATAR_ICON.SUCCESS : AVATAR_ICON.WARNING
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
