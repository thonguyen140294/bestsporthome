<template>
  <div class="casino-item">
    <a
      href="javascript:void(0)"
      :class="{ 'active': item.linkActive }"
      :title="item.title"
      @click.prevent="$_navigationMixin_navigate(item.link, false, item.newTab)"
    >
      <img :src="item.imgSrc" :alt="item.title">
      <span>{{ item.title }}</span>
    </a>
  </div>
</template>

<script>
import navigateMixin from '~/mixins/navigation'

export default {
  mixins: [navigateMixin],
  props: {
    item: {
      type: Object,
      default: () => {
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/menu-panel/items/casino-item.scss"></style>
