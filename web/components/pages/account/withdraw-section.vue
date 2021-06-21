<template>
  <div>
    <WrapperAccount title="RÚT TIỀN" :tabs="tabs" :active-tab="activeTab" @change="activeTab = $event" />
  </div>
</template>

<script>
import WrapperAccount from '~pages/account/wrapper-account'
import WithdrawBankForm from '~account/withdraw-bank-form'
import WithdrawCardForm from '~account/withdraw-card-form'

export default {
  components: {
    WrapperAccount
  },
  data () {
    return {
      activeTab: 0,
      tabEnum: {
        banking: 0,
        phone_card: 1
      }
    }
  },
  computed: {
    tabs () {
      return [
        {
          title: '1. QUA NGÂN HÀNG',
          titleSub: 'Thời gian xử lý chỉ 5’',
          component: WithdrawBankForm
        },
        {
          title: '2. QUA THẺ CÀO',
          titleSub: 'Nhận ngay thẻ trong 1’',
          component: WithdrawCardForm
        }
      ]
    }
  },
  watch: {
    activeTab (tab) {
      for (const [key, value] of Object.entries(this.tabEnum)) {
        if (tab === value) {
          this.$router.replace({ query: { tab: 'withdraw', type: key } }).catch(() => {})
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
