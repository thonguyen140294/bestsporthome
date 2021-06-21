import get from 'lodash/get'

export default {
  data () {
    return {
      per_page: 8,
      current_page: 1
    }
  },
  computed: {
    getPage () {
      return get(this.faqData, '[0].current_page')
    },
    getFaqData () {
      return get(this.faqData, '[0].items')
    },
    faqDataPagination () {
      if (this.getPage) {
        this.current_page = this.getPage
      }
      return this.getFaqData.slice((this.current_page - 1) * this.per_page, this.current_page * this.per_page)
    }
  },
  methods: {
    handlePage (currentPage) {
      this.current_page = currentPage
    }
  }
}
