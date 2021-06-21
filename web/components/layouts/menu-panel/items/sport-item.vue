<template>
  <div class="sport-item">
    <a class="sport-item__link" @click="$_navigationMixin_navigate(item.url, item.loginRequired, item.newTab, true)" />
    <div class="sport-item__container">
      <div class="sport-item__content">
        <h3 class="sport-item__content__title"> {{ item.title }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
import navigationMixin from '~/mixins/navigation'
export default {
  components: {
  },
  mixins: [navigationMixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/menu-panel/items/sport-item.scss"></style>
