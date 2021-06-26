<template>
  <section>
    <div v-if="kits.length" class="hot-kit-section">
      <div class="hot-kit-section__container container">
        <HotKitList :kits="kits" />
        <div class="hot-kit-section__model" >
						<img :src="require('~imageAsset/pages/home/hot-kit-section/alex.png')" alt="model">
				</div>
      </div>
    </div>
  </section>
</template>

<script>
import { kits } from '@/resources/hot-kit'
import HotKitList from './hot-kit-list'

export default {
  components: {
    HotKitList
  },
  data () {
    return {
      kits
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/home/hot-kit-section.scss">
</style>
