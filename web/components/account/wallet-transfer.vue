<template>
  <div class="wallet-transfer">
    <BaseRangeSlider
      :transferring="isLoading && transferring"
      :input-value="mainBalance"
      :max-value="globalTotalBalance"
      @change="updateBalanceTemp($event)"
      @changeSubmit="updateBalance($event)"
    />
    <div class="wallet-transfer__group">
      <div class="wallet-transfer__main">
        <p class="wallet-transfer__title">VÍ C:</p>
        <p class="wallet-transfer__amount">{{ mainBalance | formatAmountUnit(1) }} Đ</p>
      </div>
      <div class="wallet-transfer__sub">
        <p class="wallet-transfer__title">VÍ P:</p>
        <p class="wallet-transfer__amount">{{ subBalance | formatAmountUnit(1) }} Đ</p>
      </div>
    </div>
  </div>
</template>

<script>
import walletTransferMixin from '~/mixins/account/wallet-transfer'
import BaseRangeSlider from '~common/base-range-slider'

export default {
  components: {
    BaseRangeSlider
  },
  mixins: [walletTransferMixin],
  props: {
    submitDirect: {
      type: Boolean,
      default: true
    },
    transferring: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      mainBalance: 0,
      subBalance: 0
    }
  },
  watch: {
    globalMainBalance: {
      handler (value) {
        this.mainBalance = value
      },
      immediate: true
    },
    globalSubBalance: {
      handler (value) {
        this.subBalance = value
      },
      immediate: true
    }
  },
  methods: {
    updateBalanceTemp (balance) {
      this.mainBalance = balance
      this.subBalance = this.globalTotalBalance - balance
    },
    updateBalance (balance) {
      if (this.submitDirect) {
        this.$_walletTransferMixin_submit(balance)
      } else {
        this.$emit('transferSubmit', balance)
      }
    }
  }
}
</script>
<style lang="scss" scoped src="~scssAsset/account/wallet-transfer.scss">
</style>
