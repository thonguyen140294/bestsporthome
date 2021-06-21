<template>
  <section class="betting-sport">
    <div v-for="item in items" :key="item.name" class="betting-sport__container">
      <h4 class="betting-sport__heading">
        <img :src="require('~imageRoot/icons/double_arrow.svg')" alt="">
        <span>{{ item.name }}</span>
      </h4>
      <ul class="list">
        <li v-for="(content, index) in item.list" :key="index" class="list__item">
          {{ content.text }}
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { bettingSports } from '~/resources/about'

export default {
  data () {
    return {
      items: bettingSports
    }
  }
}
</script>
<style lang="scss" scoped src="~scssAsset/pages/about/betting-sport.scss">
</style>
