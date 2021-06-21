<template>
  <div class="soi-keo-section">
    <SoiKeoItem v-for="(item, key) in listSoiKeo" :key="key" :item="item" />
  </div>
</template>
<script>
import SoiKeoItem from './soi-keo-item'

export default {
  components: {
    SoiKeoItem
  },
  inject: ['listSoiKeo']
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/news-detail/soi-keo-section.scss"></style>
