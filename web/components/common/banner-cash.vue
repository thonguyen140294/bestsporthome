<template>
  <div class="banner-cash">
    <div class="banner-cash__wrapper">
      <div class="banner-cash__hdg">
        <img :src="require('~imageAsset/common/banner-item/cashback.png')" alt="cashback" loading="lazy">
        <div class="banner-cash__title">
          <b>Cashback</b>
          <h2>1.25%</h2>
        </div>
      </div>
      <p>Tỷ lệ hoàn trả vé cược cao nhất thị trường</p>
      <BaseButton class-name="base-button--bg-red base-button--banner" @click="$_navigationMixin_navigate('/live-sports', false, false, true)">
        CƯỢC NGAY
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
