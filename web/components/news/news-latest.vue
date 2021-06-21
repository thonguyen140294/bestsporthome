<template>
  <div class="news-latest">
    <div class="news-latest__title">
      TIN MỚI NHẤT
    </div>
    <div class="news-latest__content">
      <NewsItemBlock v-for="(item, key) in latest" :key="key" :item="item" />
    </div>
  </div>
</template>
<script>
import NewsItemBlock from '~news/news-item-block'
export default {
  components: {
    NewsItemBlock
  },
  inject: ['latest']
}
</script>

<style scoped lang="scss" src="~scssAsset/news/news-latest.scss"></style>
