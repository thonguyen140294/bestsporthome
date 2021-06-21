<template>
  <div v-if="post && post.length" class="posts-section">
    <div class="posts-section__box">
      <div class="posts-section__top">
        <h3 class="posts-section__title">{{ config.title.normalize('NFC') }}</h3>
        <a :href="config.slug" class="posts-section__link-all" @click.prevent="$_navigationMixin_navigate(config.slug, false, false)">Xem tất cả</a>
      </div>
      <div class="posts-section__bot">
        <NewsList :news-data="post" class-name="type-3" />
      </div>
    </div>
  </div>
</template>

<script>
import NEWS_API from '~/api/news'
import NewsList from '~news/news-list'
import navigationMixin from '~/mixins/navigation'

export default {
  components: {
    NewsList
  },
  mixins: [navigationMixin],
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    posts: {
      type: Array,
      default: () => []
    },
    isFetch: {
      type: Boolean,
      default: true
    }
  },
  async fetch () {
    if (this.isFetch) {
      await this.getPost()
    } else {
      this.post = this.posts
    }
  },
  data () {
    return {
      post: []
    }
  },
  methods: {
    async getPost () {
      try {
        const catList = await this.$axios.$get(NEWS_API.POST_LATEST, {
          params: {
            catIds: this.config.id,
            limit: 3
          }
        })
        this.post = catList.data
      } catch (error) {
        this.posts = []
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/news/posts-section.scss"></style>
