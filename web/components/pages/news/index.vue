<template>
  <div class="news">
    <HighlightsSection />
    <HotmatchSection />
    <div class="news__container">
      <TabNewCategories />
      <div class="news__diagram">
        <div class="news__left">
          <PostsSection :config="firstOfCategories" />
          <div class="news__promotion">
            <Promotion :items="items" is-recharge />
          </div>
          <PostsSection v-for="(item, key) in restCategories" :key="key" :config="item" />
        </div>
        <div class="news__right display__pc">
          <NewsCategories />
          <NewsPromotion />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import take from 'lodash/take'
import tail from 'lodash/tail'
import HotmatchSection from './hotmatch-section'
import HighlightsSection from './highlight-section'
import TabNewCategories from './tab-new-categories'
import PostsSection from './posts-section'
import SimplePage from '~/mixins/simple-page'
import NewsPromotion from '~news/news-promotion'
import NewsCategories from '~news/news-category'
import Promotion from '~pages/home/promotion'
import { PROMOTION_NEWS } from '~/resources/promotion'

export default {
  components: {
    HighlightsSection,
    HotmatchSection,
    NewsPromotion,
    NewsCategories,
    PostsSection,
    Promotion,
    TabNewCategories
  },
  provide () {
    return {
      firstActive: true
    }
  },
  inject: ['categories'],
  mixins: [SimplePage],
  data () {
    return {
      items: PROMOTION_NEWS
    }
  },
  computed: {
    normalizedCategories () {
      return this.categories.map((category) => {
        return {
          title: category.name,
          ...category
        }
      })
    },
    firstOfCategories () {
      const firstCategory = take(this.normalizedCategories)
      return firstCategory.length !== 0 ? firstCategory[0] : {}
    },
    restCategories () {
      return tail(this.normalizedCategories)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/news/index.scss"></style>
