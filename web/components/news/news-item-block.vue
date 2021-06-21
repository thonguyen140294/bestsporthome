<template>
  <div class="news-item-block" :class="className">
    <div class="news-item-block__wrap-img hover-shine" @click.prevent="$_navigationMixin_navigate(`/${item.slug}`, false, false)">
      <NewsImage :media="item.media" />
    </div>
    <div class="news-item-block__content">
      <h5 class="news-item-block__category" @click.prevent="$_navigationMixin_navigate(`${item.category_slug}`, false, false)">
        {{ getCategory(item) }}
      </h5>
      <p class="news-item-block__text" @click.prevent="$_navigationMixin_navigate(`/${item.slug}`, false, false)">{{ item.title }}</p>
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
      default: () => []
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getCategory (cate) {
      return get(cate, 'categories[0].name', '')
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/news/news-item-block.scss">
</style>
