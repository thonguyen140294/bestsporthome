<template>
  <div class="category">
    <div class="category__container">
      <BreadcrumbSection />
    </div>
    <div class="category__container">
      <p v-if="catName" class="category__name">{{ catName }}</p>
      <div class="category__content">
        <div class="category__left">
          <div v-if="postsList && postsList.length">
            <p v-if="catDescription" class="category__desc display__pc">{{ catDescription }}</p>
            <div class="category__box">
              <NewsList :news-data="postsList | getSlice(0, sliceNumber)" class-name="type-4" />
            </div>
            <div class="category__promotion">
              <Promotion :items="items" is-recharge />
            </div>
            <div class="category__box">
              <NewsList :news-data="postsList | getSlice(sliceNumber, limit)" class-name="type-4" />
              <NewsList v-if="$device.isMobileOrTablet" :news-data="postsLoadMore" class-name="type-4" />
            </div>
            <div class="category__pagination">
              <div v-if="$device.isMobileOrTablet">
                <div v-if="showLoadMore" class="category__load-more" @click="handleLoadMore">
                  <span>Xem thêm</span>
                </div>
              </div>
              <div v-else>
                <Pagination
                  v-if="pagination.total > 15"
                  :total="pagination.total"
                  model="dark"
                  :per-page="pagination.limit"
                  @handle-page="handlePage"
                />
              </div>
            </div>
          </div>
          <div v-else class="category__none">
            <h3>Không có bài viết để hiển thị</h3>
          </div>
        </div>
        <div class="category__right display__pc">
          <NewsCategory />
          <NewsPromotion />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Promotion from '~pages/home/promotion'
import NewsPromotion from '~news/news-promotion'
import SimplePage from '~/mixins/simple-page'
import NewsList from '~news/news-list'
import NewsCategory from '~news/news-category'
import Pagination from '~common/pagination'
import NEWS_API from '~/api/news'
import { PROMOTION_NEWS } from '~/resources/promotion'
import BreadcrumbSection from '~pages/category/breadcrumb-section'

export default {
  components: {
    NewsList,
    NewsCategory,
    NewsPromotion,
    Promotion,
    Pagination,
    BreadcrumbSection
  },
  mixins: [SimplePage],
  data () {
    return {
      postsList: this.posts,
      postsLoadMore: [],
      offset: this.$device.isMobileOrTablet ? 10 : this.pagination.limit,
      showLoadMore: this.pagination.total > this.pagination.limit,
      items: PROMOTION_NEWS,
      sliceNumber: this.$device.isMobileOrTablet ? 2 : 6,
      limit: this.$device.isMobileOrTablet ? 10 : this.pagination.limit
    }
  },
  inject: ['categories', 'catName', 'catDescription', 'posts', 'pagination'],
  methods: {
    async handlePage (page) {
      try {
        const resPost = await this.$axios.$get(NEWS_API.POST_LATEST, {
          params: {
            catIds: this.pagination.catId,
            limit: this.pagination.limit,
            offset: (page - 1) * this.pagination.limit
          }
        })

        $('html, body').animate({ scrollTop: 0 }, 'slow')
        this.postsList = resPost.data
      } catch (e) {
        this.postsList = []
        this.pagination.total = 0
      }
    },
    async handleLoadMore () {
      try {
        const resPost = await this.$axios.$get(NEWS_API.POST_LATEST, {
          params: {
            catIds: this.pagination.catId,
            limit: this.limit,
            offset: this.offset
          }
        })
        if (resPost.data && resPost.data.length) {
          this.offset = this.offset + this.limit
          this.postsLoadMore.push(...resPost.data)
        } else {
          this.showLoadMore = false
        }
      } catch (e) {
        this.postsLoadMore = []
        this.pagination.total = 0
        this.showLoadMore = false
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/category/index.scss"></style>
