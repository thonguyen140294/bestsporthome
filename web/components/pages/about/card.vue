<template>
  <div class="card-about">
    <div v-for="card in cards" :key="card.id" class="card-about__item">
      <div class="card-about__icon">
        <img :src="card.imgSrc" alt="">
      </div>
      <div class="card-about__body">
        <h3 class="card-about__title">{{ card.title }}</h3>
        <p class="card-about__content">
          {{ card.content }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { cardItems } from '~/resources/about'

export default {
  data () {
    return {
      cards: cardItems
    }
  }
}
</script>
<style lang="scss" scoped src="~scssAsset/pages/about/card.scss">
</style>
