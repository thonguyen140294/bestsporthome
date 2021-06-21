<template>
  <section>
    <SportCenterFilter class="display__sp container" @change="selected = $event" />
    <div class="sport-center container">
      <SportCenterFilter class="display__pc" @change="selected = $event" />
      <SportCenterItem v-for="(item, index) in items.slice(0, 7)" :key="index" :item="item" />
      <SportCenterLoadMore :selected="selected" />
    </div>
  </section>
</template>

<script>
import { sportCenter } from '@/resources/sport-center'
import SportCenterFilter from './sport-center-filter'
import SportCenterLoadMore from './sport-center-load-more'
import SportCenterItem from '~lobby/sport-center-item'
export default {
  components: {
    SportCenterFilter,
    SportCenterLoadMore,
    SportCenterItem
  },
  data () {
    return {
      selected: 'all'
    }
  },
  computed: {
    items () {
      return sportCenter[this.selected]?.items ?? []
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/home/sport-center.scss">
</style>
