import NEWS_API from '@/api/news'

export default {
  data () {
    return {
      news: [],
      limit: 5
    }
  },
  async fetch () {
    await this.$_newsMixin_getLatestPost()
  },
  methods: {
    async $_newsMixin_getLatestPost () {
      try {
        const { response } = await this.$axios.$get(NEWS_API.HOME_POSTS, {
          params: {
            limit: this.limit
          }
        })
        const cateList = [];
        (response || []).filter(({ data }) => data.length).forEach((item, key) => {
          const data = item.data
          for (const post of data) {
            post.categories.unshift(post.searched_category)
          }
          const title = (data[0].categories[0].name || '').normalize('NFC')
          cateList[key] = {
            data, title
          }
        })
        this.news = cateList
      } catch (error) {
        return false
      }
    }
  }
}
