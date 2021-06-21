import get from 'lodash/get'
import slice from 'lodash/slice'
import { getParentSlug } from '@/helper/news-utils'
import CategoryComponent from '~pages/category/index'
import PostComponent from '~pages/news-detail/index'
import NEWS_API from '~/api/news'
import { META_TITLES } from '~/resources/meta-titles'
import { loadExternalScript } from '~/helper/index'

export default {
  layout: 'default',
  components: {
    CategoryComponent,
    PostComponent
  },
  data () {
    return {
      selectedComponent: 'CategoryComponent'
    }
  },
  provide () {
    return {
      posts: this.posts,
      categories: this.categories,
      catName: this.categoryData.name.normalize('NFC'),
      catDescription: this.categoryData.meta?.description.normalize('NFC'),
      categoryData: this.categoryData,
      parentCategoryData: this.parentCategoryData,
      latest: this.latest,
      pagination: {
        total: this.total,
        catId: this.catId,
        limit: this.limit
      },
      firstActive: false,
      // news post
      postDetails: this.postDetails,
      postRelated: this.postRelated,
      listSoiKeo: this.listSoiKeo
    }
  },
  async asyncData ({ params, $axios, store, error }) {
    try {
      return await getNewsPostData(params.slug)
    } catch (e) {
      try {
        return await getCategoryData(params.slug)
      } catch (e) {
        console.error(e)
        error({ statusCode: 404 })
      }
    }
    async function getCategoryData (slug) {
      const categorySlug = slug.replace(/\.\w+$/g, '')
      const { data: [categoryData] } = await $axios.$get(NEWS_API.CATEGORY_BY_SLUG, {
        params: { slug: categorySlug }
      })
      const parentCategorySlug = getParentSlug(categoryData.link, categorySlug)
      let parentCategoryData = null
      if (parentCategorySlug) {
        try {
          const { data: [parentCategoryRes] } = await $axios.$get(NEWS_API.CATEGORY_BY_SLUG, {
            params: { slug: parentCategorySlug }
          })
          parentCategoryData = parentCategoryRes
        } catch (e) {
          // Do nothing if parent does not exist
        }
      }
      const categoryId = categoryData.id
      const postsPromise = $axios.$get(NEWS_API.POST_LATEST, {
        params: {
          catIds: categoryId,
          limit: 15
        }
      })
      let categoriesPromise, postsLatestPromise
      const newsState = store.state.news
      if (process.client && newsState.categories.length) {
        categoriesPromise = { data: newsState.categories }
        postsLatestPromise = { data: newsState.latest }
      } else {
        categoriesPromise = $axios.$get(NEWS_API.POST_CATEGORIES)
        postsLatestPromise = $axios.$get(NEWS_API.POST_LATEST, {
          params: {
            limit: 6
          }
        })
      }
      const [postsRes, categoriesRes, latestRes] = await Promise.all([postsPromise, categoriesPromise, postsLatestPromise])
      store.commit('news/setCategories', categoriesRes.data)
      store.commit('news/setLatest', latestRes.data)
      categoryData.name = categoryData.name.normalize('NFC')
      return {
        categoryData,
        parentCategoryData,
        posts: postsRes.data,
        categories: categoriesRes.data,
        latest: latestRes.data,
        catId: categoryId,
        limit: 15,
        total: parseInt(postsRes.total)
      }
    }
    async function getNewsPostData (slug) {
      const postDetailPromise = await $axios.$get(NEWS_API.POST_DETAIL, {
        params: { slug }
      })
      const [postDetailRes] = await Promise.all([postDetailPromise])
      const postRelated = slice(get(postDetailRes, 'data[0].relatedPost', []), 4, 8)
      const postDetails = get(postDetailRes, 'data[0].post', {})
      const categoryData = get(postDetailRes, 'data[0].post.categories[0]', {})
      const postCatSlug = get(postDetailRes, 'data[0].post.category_slug', {})
      const listSoiKeo = slice(get(postDetailRes, 'data[0].relatedPost', {}), 0, 4)

      const parentCategorySlug = getParentSlug(postCatSlug, categoryData.slug)
      let parentCategoryData = null
      if (parentCategorySlug) {
        try {
          const { data: [parentCategoryRes] } = await $axios.$get(NEWS_API.CATEGORY_BY_SLUG, {
            params: { slug: parentCategorySlug }
          })
          parentCategoryData = parentCategoryRes
        } catch (e) {
          // Do nothing if parent does not exist
        }
      }
      let categories
      if (process.client && store.state.news.categories.length) {
        categories = store.state.news.categories
      } else {
        const { data } = await $axios.$get(NEWS_API.POST_CATEGORIES)
        categories = data
      }
      store.commit('news/setCategories', categories)
      const isDetail = true
      return { postDetails, postRelated, listSoiKeo, parentCategoryData, categoryData, categories, isDetail }
    }
  },
  mounted () {
    if (this.isDetail) { this.selectedComponent = 'PostComponent' }
    this.$nextTick(() => {
      loadExternalScript('/js/jquery-3.5.1.min.js', () => {
        loadExternalScript('/js/jquery.smooth-scroll.min.js')
        loadExternalScript('/js/sticky-kit.min.js')
        loadExternalScript('/js/js.cookie.min.js', () => {
          loadExternalScript('/vendor/toc/js/toc.min.js')
        })
      })
    })
  },
  beforeCreate () {
    this.component = 'Desktop'
  },
  head () {
    return {
      title: META_TITLES.default + ' | ' + this.categoryData.meta?.title,
      meta: [
        {
          hid: this.categoryData.meta?.title,
          name: 'description',
          content: this.categoryData.meta?.description
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: '/vendor/toc/icomoon/style.css'
        }
      ]
    }
  }
}
