<template>
  <p class="balance"><span> {{ globalTotalBalance | formatAmountUnit(1) }} </span>đ</p>
</template>

<script>
import globalMixin from '~/mixins/global-mixin'
export default {
  mixins: [globalMixin]
}
</script>

<style lang="scss" scoped src="~scssAsset/common/balance.scss">
</style>
