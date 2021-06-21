<template>
  <div class="news-grid">
    <div class="news-grid__wrapper pc-show">
      <div class="news-grid__left">
        <NewsItem :item="getFirstPost" />
      </div>
      <div class="news-grid__right">
        <NewsItem v-for="(item, key) in otherPost" :key="key" :item="item" />
      </div>
    </div>
    <div class="news-grid__wrapper pc-hide">
      <PostsSection
        :is-fetch="false"
        :config="post"
        :posts="otherPost"
      />
    </div>
  </div>
</template>

<script>
import slice from 'lodash/slice'
import take from 'lodash/take'
import NewsItem from '~news/news-item'
import PostsSection from '~pages/news/posts-section'
export default {
  components: {
    NewsItem,
    PostsSection
  },
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    items () {
      return this.post?.data?.length !== 0 ? this.post.data : []
    },
    getFirstPost () {
      const firstPost = take(this.items)
      return firstPost.length !== 0 ? firstPost[0] : {}
    },
    otherPost () {
      return slice(this.items, 1, 4)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/news/news-grid.scss"></style>
