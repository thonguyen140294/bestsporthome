<template>
  <div class="banner-deposit">
    <h2>Bonus <span>110%</span> | Up to <span>10.000.000 VNĐ</span></h2>
    <p>Áp dụng cho lần nạp tiền đầu tiên</p>
    <BaseButton class-name="base-button--bg-red base-button--banner" @click="clickDeposit()">
      NẠP TIỀN NGAY
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from '~common/base-button'
import navigateMixin from '~/mixins/navigation'

export default {
  components: {
    BaseButton
  },
  mixins: [navigateMixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    clickDeposit () {
      const url = this.$device.isMobileOrTablet
        ? '/account?tab=deposit'
        : '/account?tab=deposit&type=paywin&package=welcome'

      this.$_navigationMixin_navigate(url, true, false, true)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/common/banner-deposit.scss"></style>
