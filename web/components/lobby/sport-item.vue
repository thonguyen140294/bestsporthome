<template>
  <div class="sport-item">
    <a class="sport-item__link" @click="$_navigationMixin_navigate(item.url, item.loginRequired, item.newTab, true)" />
    <div class="sport-item__container">
      <div class="sport-item__content">
        <h3 class="sport-item__content__title"> {{ item.title }}</h3>
        <p class="sport-item__content__text display__pc"> {{ item.description }}</p>
        <p class="sport-item__content__btn display__pc">CHƠI NGAY <img :src="require('~imageRoot/icons/icon-right-sport.svg')" alt="icon sport"></p>
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

<style scoped lang="scss" src="~scssAsset/lobby/sport-item.scss"></style>
