<template>
  <div class="banner-cash banner-bank">
    <div class="banner-cash__wrapper banner-bank__wrapper">
      <div class="banner-cash__bank">
        <div class="bank-bonus">
          <span class="bonus-info display-mb">Tặng 100.000 vnđ</span>
          <span class="bonus-info display-pc">Tặng ngay 100.000 vnđ</span>
          <span class="bank-rec"></span>
        </div>
        <p class="bank-highlight">
          Xác nhận tài khoản ngân hàng CHÍNH CHỦ
        </p>
      </div>
      <p class="banner-cash__desc">Bảo mật tuyệt đối - Giao dịch an tâm</p>
      <BaseButton class-name="base-button--bg-red base-button--banner banner-bank-btn" @click="$_navigationMixin_navigate('/account?tab=account-info&type=info-bank', true, false, true)">
        XÁC NHẬN NGAY
      </BaseButton>
    </div>
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
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/common/banner-cash.scss"></style>
