<template>
  <div class="game-center-item">
    <a href="#" :class="{ 'active': item.linkActive }" :title="item.title" @click.prevent="clickItemGameCenter(item)">
      <img :src="item.imgSrc" :alt="item.title">
      <span>{{ item.title }}</span>
      <b v-if="item.label" class="game-center-item__label" :class="item.label">{{ item.label.toUpperCase() }}</b>
    </a>
  </div>
</template>

<script>
import navigateMixin from '~/mixins/navigation'
import scrollTabMixin from '~/mixins/scroll-tab'

export default {
  mixins: [navigateMixin, scrollTabMixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    clickItemGameCenter (item) {
      this.$_navigationMixin_navigate(item.link, item.loginRequired, item.newTab)
      this.selectScrollTabGameItem()
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/menu-panel/items/game-center-item.scss"></style>
