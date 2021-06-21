<template>
  <div class="info-account-section">
    <WrapperAccount :title="currentTab.title" @back="$router.push('/account')">
      <v-component :is="currentTab.component" />
    </WrapperAccount>
  </div>
</template>

<script>
import WrapperAccount from '~pages/account/sp/wrapper-account'
import InfoPersonalForm from '~account/sp/info-personal-form'
import InfoMyBank from '~account/info-my-bank'

export default {
  components: {
    WrapperAccount
  },
  computed: {
    tabs () {
      return [
        {
          type: 'info-personal',
          tab: 0,
          title: 'THÔNG TIN CÁ NHÂN',
          component: InfoPersonalForm
        },
        {
          type: 'info-bank',
          tab: 1,
          title: 'THÔNG TIN NGÂN HÀNG',
          component: InfoMyBank
        }
      ]
    },
    currentTab () {
      return this.tabs.find(item => item.type === this.$getRoute(this.$route).query.type) || {}
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/pages/account/sp/info-account-section.scss"></style>
