<template>
  <div class="sport-section">
    <div class="sport-section__wrapper container">
      <SportItem v-for="(item,index) in SPORTS" :key="index" :item="item" mobile="true" />
    </div>
  </div>
</template>

<script>
import SportItem from './items/sport-item'
import { SPORTS } from '~/resources/sports'

export default {
  components: {
    SportItem
  },
  data () {
    return {
      SPORTS
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/menu-panel/sport-section.scss"></style>
