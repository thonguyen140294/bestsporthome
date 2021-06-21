import get from 'lodash/get'

export const state = () => ({
  categories: [],
  latest: [],
  highlight: [],
  homeCategoriesWithPosts: []
})

export const getters = {
  getCategoriesWithPost (state) {
    return state.homeCategoriesWithPosts.filter(({ data }) => data.length).map(({ data }) => {
      return {
        title: get(data, '[0].searched_category.name').normalize('NFC'),
        slug: get(data, '[0].searched_category.slug'),
        data
      }
    })
  }
}

export const mutations = {
  setCategories (state, categories) {
    state.categories = categories
  },
  setLatest (state, posts) {
    state.latest = posts
  },
  setHomeCategoriesWithPosts (state, data) {
    state.homeCategoriesWithPosts = data
  },
  setHighlight (state, posts) {
    state.highlight = posts
  }
}
