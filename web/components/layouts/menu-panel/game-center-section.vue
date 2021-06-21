<template>
  <div class="game-center-section">
    <h3 class="game-center-section__title">GAMES CENTER</h3>
    <div class="game-center-section__item">
      <GameCenterItem v-for="(item, key) in getListGameCenter" :key="key" :item="item" />
    </div>
  </div>
</template>

<script>
import GameCenterItem from './items/game-center-item'
import { gameCenterSection } from '~/resources/menu-panel'

export default {
  components: {
    GameCenterItem
  },
  props: {
    linkActive: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      items: gameCenterSection
    }
  },
  computed: {
    getListGameCenter () {
      return this.items.map((item) => {
        return {
          linkActive: this.linkActive === item.link,
          ...item
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/menu-panel/game-center-section.scss"></style>
