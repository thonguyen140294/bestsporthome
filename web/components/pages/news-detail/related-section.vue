<template>
  <div class="related-section">
    <div class="related-section__title">
      TIN TỨC LIÊN QUAN
    </div>
    <div class="related-section__post">
      <NewsList :news-data="posts" class-name="type-1" />
    </div>
  </div>
</template>
<script>
import NewsList from '~news/news-list'
export default {
  inject: ['postRelated'],
  components: {
    NewsList
  },
  computed: {
    posts () {
      if (this.postRelated && this.postRelated.length) {
        return this.postRelated.map((item) => {
          item.media = { source_url: item.thumbnail }
          return item
        })
      }
      return []
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/news-detail/related-section.scss"></style>
