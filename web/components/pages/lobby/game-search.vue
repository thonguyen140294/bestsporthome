<template>
  <div class="game-search">
    <h2 class="game-search__top">Kết Quả Tìm Kiếm</h2>
    <div v-if="tab !=='all' && tab !=='allgame'" class="game-search__content">
      <GameCenterItem v-for="(item, index) in gamesByType" :key="'type' + index" :item="item" />
    </div>
    <div v-else class="game-search__content">
      <GameCenterItem v-for="(item, index) in items" :key="'game' + index" :item="item" />
    </div>
  </div>
</template>

<script>
import GameCenterItem from '~lobby/sport-center-item'

export default {
  components: {
    GameCenterItem
  },
  props: {
    allGames: {
      type: Object,
      default: () => {}
    },
    gamesByType: {
      type: Array,
      default: () => []
    },
    tab: {
      type: String,
      default: ''
    }
  },
  computed: {
    items () {
      const result = []
      const allGames = this.allGames
      Object.keys(allGames).forEach((item) => {
        allGames[item].forEach((element) => {
          result.push(element)
        })
      })
      return result
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/lobby/game-search.scss">
</style>
