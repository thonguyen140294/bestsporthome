<template>
  <component :is="component" />
</template>

<script>
import Desktop from '~pages/news/index'
import NEWS_API from '~/api/news'

export default {
  layout: 'default',
  components: {
    Desktop
  },
  provide () {
    return {
      highlight: this.highlight,
      categories: this.categories
    }
  },
  async asyncData ({ $axios, store, error }) {
    try {
      let categories, highlight, homeCategories
      const newsState = store.state.news
      if (process.client && newsState.categories.length) {
        categories = { data: newsState.categories }
        highlight = { data: newsState.highlight }
        homeCategories = { response: newsState.homeCategoriesWithPosts }
      } else {
        categories = $axios.$get(NEWS_API.POST_CATEGORIES)
        highlight = $axios.$get(NEWS_API.POST_HIGHLIGHT)
        homeCategories = $axios.$get(NEWS_API.HOME_POSTS, {
          params: {
            limit: 5
          }
        })
      }

      const [categoriesRes, homeCategoriesRes, highlightRes] = await Promise.all([categories, homeCategories, highlight])
      const excludeCatIds = homeCategoriesRes.response.map(cat => cat.data.length && cat.data[0].searched_category.id)
      categoriesRes.data = categoriesRes.data.filter(cat => !excludeCatIds.includes(cat.id))
      store.commit('news/setCategories', categoriesRes.data)
      store.commit('news/setHighlight', highlightRes.data)
      store.commit('news/setHomeCategoriesWithPosts', homeCategoriesRes.response)
      return {
        categories: categoriesRes.data,
        highlight: highlightRes.data
      }
    } catch (e) {
      console.error(e)
      error({ statusCode: 404 })
    }
  },
  beforeCreate () {
    this.component = 'Desktop'
  }
}
</script>
