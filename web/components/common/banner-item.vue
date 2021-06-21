<template>
  <div class="banner-item" @click="$_navigationMixin_navigate(item.link, item.loginRequired, item.newTab, item.mainWallet)">
    <v-component :is="item.content" />
  </div>
</template>

<script>
import navigateMixin from '~/mixins/navigation'

export default {
  mixins: [navigateMixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    isSrcMobile: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/common/banner-item.scss"></style>
