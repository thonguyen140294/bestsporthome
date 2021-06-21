<template>
  <section>
    <div v-if="games.length" class="casino-section">
      <div class="casino-section__container container">
        <CasinoList :games="games" />
        <div class="casino-section__model" />
      </div>
    </div>
  </section>
</template>

<script>
import { casino } from '@/resources/casino'
import CasinoList from './casino-list'

export default {
  components: {
    CasinoList
  },
  data () {
    return {
      games: casino
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/home/casino-section.scss">
</style>
