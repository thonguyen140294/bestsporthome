<template>
  <div class="news-item" :class="className">
    <div class="news-item__link">
      <div class="news-item__wrap hover-shine" @click.prevent="$_navigationMixin_navigate(`/${item.slug}`, false, false)">
        <NewsImage :media="item.media" />
      </div>
      <div class="news-item__content">
        <h5 class="news-item__category" :style="isSameCurrentRoute && 'cursor: default'" @click.prevent="$_navigationMixin_navigate(`/${categorySlug}`, false, false)">
          {{ categoryName.normalize('NFC') }}
        </h5>
        <p class="news-item__text" @click.prevent="$_navigationMixin_navigate(`/${encodeURIComponent(item.slug)}`, false, false)">{{ item.title }}</p>
        <p class="news-item__date">
          <span>{{ item.created_date | formatDate }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get'
import NewsImage from './news-image'
import navigationMixin from '~/mixins/navigation'

export default {
  components: {
    NewsImage
  },
  mixins: [navigationMixin],
  props: {
    className: {
      type: [String, Array],
      default: () => ['type-1']
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    categoryName () {
      return get(this.item, 'categories[0].name', '')
    },
    categorySlug () {
      return get(this.item, 'categories[0].slug', '')
    },
    isSameCurrentRoute () {
      return this.item.category_slug.replace(/\/$/, '') === this.$getRoute(this.$route).path
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/news/news-item.scss">
</style>
