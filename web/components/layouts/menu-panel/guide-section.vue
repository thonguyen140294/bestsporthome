<template>
  <div class="guide-section">
    <LinkItem
      v-for="(item, key) in items"
      :key="key"
      class="link-item--guide"
      :item="item"
      @click="clickGuideLinkItem(item)"
    />
  </div>
</template>

<script>
import { guideSection } from '~/resources/menu-panel'
import LinkItem from '~common/link-item'
import navigateMixin from '~/mixins/navigation'
import scrollToTopMixin from '~/mixins/scroll-to-top'
import modalMixin from '~/mixins/user/modal'

export default {
  components: {
    LinkItem
  },
  mixins: [modalMixin, scrollToTopMixin, navigateMixin],
  data () {
    return {
      items: guideSection
    }
  },
  methods: {
    clickGuideLinkItem (item) {
      const currentRoute = this.$router.currentRoute
      if (item.link === currentRoute.fullPath) {
        this.$_modalMixin_closeAllModal()
        this.$_clickScrollToTop()
        return
      }
      this.$_navigationMixin_navigate(item.link, false, item.newTab)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/menu-panel/guide-section.scss"></style>
