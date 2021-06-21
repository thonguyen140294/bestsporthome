<template>
  <div class="banner-jackpot">
    <div class="banner-jackpot__wrapper">
      <BaseButton class-name="base-button--bg-red base-button--banner" @click="$_navigationMixin_navigate('/lobby?game=jackpots', false, false, false)">
        CHƠI NGAY
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

<style scoped lang="scss" src="~scssAsset/common/banner-jackpot.scss"></style>
