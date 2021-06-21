<template>
  <div class="news-list" :class="[className]">
    <NewsItem
      v-for="(item, index) in newsData"
      :key="index"
      class="news-list__item"
      :item="item"
      :class-name="[className, { 'hide': className === 'type-2' && index === 1 }]"
    />
  </div>
</template>

<script>
import NewsItem from './news-item'

export default {
  components: {
    NewsItem
  },
  props: {
    className: {
      type: String,
      default: 'type-1'
    },
    newsData: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/news/news-list.scss"></style>
