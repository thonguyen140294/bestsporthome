<template>
  <div>
    <WrapperAccount title="LỊCH SỬ GIAO DỊCH" :component="component" />
  </div>
</template>

<script>
import WrapperAccount from './wrapper-account'
import HistoryTransaction from '~account/history-transaction'

export default {
  components: {
    WrapperAccount
  },
  data () {
    return {
      component: HistoryTransaction
    }
  }
}
</script>

<style scoped lang="scss"></style>
