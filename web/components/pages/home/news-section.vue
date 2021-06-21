<template>
  <section>
    <div v-show="news && news.length" class="news-section">
      <div class="news">
        <h4 class="news__title">TIN TỨC</h4>
        <BaseTab :items="news">
        <template #newTab="{ item }">
          <NewsList :news-data="item.data | getSlice(0, 2)" class-name="type-2" />
          <NewsList :news-data="item.data | getSlice(2, 5)" class-name="type-1" />
        </template>
      </BaseTab>
        <div class="news__more">
          <nuxt-link class="news__more__link" :to="linkRequired.link">
            {{ linkRequired.title }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-show="!news.length" class="news-section">
      <div class="news">
        <h4 class="news__title">TIN TỨC</h4>
        <NewsSkeleton />
      </div>
    </div>
  </section>
</template>

<script>
import latestNewsMixin from '@/mixins/news/latest-news'
import NewsList from '~news/news-list'
import NewsSkeleton from '~news/new-skeleton'
import BaseTab from '~common/base-tab'

export default {
  components: {
    NewsList,
    BaseTab,
    NewsSkeleton
  },
  mixins: [latestNewsMixin],
  data () {
    return {
      linkRequired: {
        link: '/tin-tuc',
        title: 'Xem tất cả'
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/home/news-section.scss">
</style>
