<template>
  <div class="banner-deposit">
    <h2>Bonus <span>30%</span> | Up to <span>10.000.000 VNĐ</span></h2>
    <p>Áp dụng cho lần nạp thứ 2</p>
    <BaseButton class-name="base-button--bg-red base-button--banner" @click="clickSecondDeposit()">
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
    clickSecondDeposit () {
      const url = this.$device.isMobileOrTablet
        ? '/account?tab=deposit'
        : '/account?tab=deposit&type=paywin&package=promotion'

      this.$_navigationMixin_navigate(url, true, false, true)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/common/banner-deposit.scss"></style>
