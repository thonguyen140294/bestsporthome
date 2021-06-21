<template>
  <div class="casino-item">
    <a class="casino-item__link" @click.prevent="$_navigationMixin_navigate(item.link, false, false)" />
    <p class="casino-item__content">
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

<style scoped lang="scss" src="~scssAsset/lobby/casino-item.scss">
</style>
