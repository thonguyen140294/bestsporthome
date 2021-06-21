<template>
  <div class="news-detail" :class="{'news-detail--image': getImage}">
    <div class="news-detail__top">
      <div class="news-detail__container">
        <BreadcrumbSection />
        <div class="news-detail__title">
          <h1>{{ postDetails.title }}</h1>
        </div>
        <div class="news-detail__date">
          {{ postDetails.created_date | formatDate }}
        </div>
      </div>
    </div>
    <div class="news-detail__content news-detail__container">
      <div class="news-detail__left">
        <div class="news-detail__content-write" v-html="postDetails.content" />
        <SoiKeoSection />
        <RelatedSection />
      </div>
      <div class="news-detail__right display__pc">
        <NewsCategories />
        <NewsPromotion />
      </div>
    </div>
  </div>
</template>
<script>
import get from 'lodash/get'
import RelatedSection from './related-section'
import SoiKeoSection from './soi-keo-section'
import BreadcrumbSection from './breadcrumb-section'
import SimplePage from '~/mixins/simple-page'
import NewsCategories from '~news/news-category'
import NewsPromotion from '~news/news-promotion'

export default {
  components: {
    RelatedSection,
    SoiKeoSection,
    BreadcrumbSection,
    NewsCategories,
    NewsPromotion
  },
  inject: ['postDetails'],
  mixins: [SimplePage],
  computed: {
    getImage () {
      return get(this.postDetails, 'featureImages.source_url')
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/news-detail/index.scss"></style>
