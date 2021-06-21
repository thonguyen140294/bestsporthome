<template>
  <div>
    <WrapperAccount title="NẠP TIỀN" :tabs="tabs" :active-tab="activeTab" @change="activeTab = $event" />
  </div>
</template>

<script>
import WrapperAccount from '~pages/account/wrapper-account'
import DepositBankForm from '~account/deposit-bank-form'
import DepositPaywinForm from '~account/deposit-paywin-form'
import DepositMomoForm from '~account/deposit-momo-form'
import DepositCardForm from '~account/deposit-card-form'

export default {
  components: {
    WrapperAccount
  },
  data () {
    return {
      activeTab: 0,
      tabEnum: {
        paywin: 0,
        taiquay: 1,
        atm: 1,
        banking: 1,
        momo: 2,
        phone_card: 3
      }
    }
  },
  computed: {
    tabs () {
      return [
        {
          title: '1. QUA PAYWIN',
          titleSub: 'Siêu tốc và bảo mật, chỉ 1’30',
          component: DepositPaywinForm
        },
        {
          title: '2. QUA NGÂN HÀNG',
          titleSub: 'Thời gian xử lý chỉ 5’',
          component: DepositBankForm
        },
        {
          title: '3. QUA MOMO',
          titleSub: 'Siêu tiện lợi, xử lý 3’',
          component: DepositMomoForm
        },
        {
          title: '4. QUA THẺ CÀO',
          titleSub: 'Siêu tốc và bảo mật, chỉ 1’30',
          component: DepositCardForm
        }
      ]
    }
  },
  watch: {
    activeTab (tab) {
      for (const [key, value] of Object.entries(this.tabEnum)) {
        if (tab === value) {
          this.$router.replace({ query: { tab: 'deposit', type: key, package: this.$getRoute(this.$route).query.package } }).catch(() => {})
        }
      }
    },
    '$route.query.type': {
      handler (value) {
        this.activeTab = this.tabEnum[value]
      },
      immediate: true
    }
  }
}
</script>

<style></style>
