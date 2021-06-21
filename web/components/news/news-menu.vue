<template>
  <div class="news-menu">
    <h4 class="news-menu__title">{{ title }}</h4>
    <BaseTab :items="getCategoriesWithPost">
      <template #newTab="{ item }">
        <NewsGrid :post="item" />
      </template>
    </BaseTab>
  </div>
</template>
<script>
import BaseTab from '~common/base-tab'
import NewsGrid from '~news/news-grid'

export default {
  components: {
    BaseTab,
    NewsGrid
  },
  props: {
    title: {
      type: String,
      default: 'TIN TỨC'
    }
  },
  computed: {
    getCategoriesWithPost () {
      return this.$store.getters['news/getCategoriesWithPost']
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/news/news-menu.scss"></style>
