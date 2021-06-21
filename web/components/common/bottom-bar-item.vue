<template>
  <div class="bottom-bar-item" @click.prevent="handleClick">
    <div class="bottom-bar-item__link" @click="handleClickBottomBarItem">
      <BottomBarContent :item="item" />
    </div>
  </div>
</template>

<script>
import BottomBarContent from './bottom-bar-content'
import globalMixin from '~/mixins/global-mixin'
import navigationMixin from '~/mixins/navigation'
import modalMixin from '~/mixins/user/modal'
import scrollToTopMixin from '~/mixins/scroll-to-top'

export default {
  components: {
    BottomBarContent
  },
  mixins: [globalMixin, navigationMixin, modalMixin, scrollToTopMixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleClick () {
      if (this.item.link) {
        this.$_modalMixin_closeAllModal()
      }
      this.$emit('eventClick', this.item)
    },
    clickLinkRouterPage () {
      this.$_navigationMixin_navigate(this.item.link, false)
      this.$_clickScrollToTop()
    },
    handleClickBottomBarItem () {
      if (this.item.link && (this.item.newTab || this.item.mainWallet)) {
        this.$_navigationMixin_navigate(this.item.link, false, this.item.newTab, this.item.mainWallet)
        return
      }
      if (this.item.link) {
        this.clickLinkRouterPage()
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/common/bottom-bar-item.scss"></style>
