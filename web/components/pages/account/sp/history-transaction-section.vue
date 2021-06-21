<template>
  <div class="history-transaction-section">
    <WrapperAccount :title="tabInfo.title" @back="$router.push('/account')">
      <HistoryTransaction />
    </WrapperAccount>
  </div>
</template>

<script>
import WrapperAccount from './wrapper-account'
import HistoryTransaction from '~account/sp/history-transaction'

export default {
  components: {
    WrapperAccount,
    HistoryTransaction
  },
  props: {
    tabInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
