<template>
  <div class="casino-section">
    <h3 class="casino-section__title"><span>LIVE</span>CASINO</h3>
    <div class="casino-section__item">
      <CasinoItem v-for="(item, key) in getListGameCasino" :key="key" :item="item" />
    </div>
  </div>
</template>

<script>
import CasinoItem from './items/casino-panel-item'
import { casinoSection } from '~/resources/menu-panel'

export default {
  components: {
    CasinoItem
  },
  props: {
    linkActive: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      items: casinoSection
    }
  },
  computed: {
    getListGameCasino () {
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

<style scoped lang="scss" src="~scssAsset/layouts/menu-panel/casino-section.scss"></style>
