<template>
  <div class="hot-kit-item">
    <a class="hot-kit-item__link" @click.prevent="$_navigationMixin_navigate(item.link, false, false)" />
		<img class="hot-kit-item__img" :src="item.imgSrc" :alt="item.title">
    <p class="hot-kit-item__content">
      <span>Evolution Gaming</span>
      <b>{{ item.title }}</b>
    </p>
  </div>
</template>

<script>
import navigateMixin from '~/mixins/navigation'
export default {
  components: {
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

<style scoped lang="scss" src="~scssAsset/lobby/hot-kit-item.scss">
</style>
