import $ from 'jquery'

export default {
  methods: {
    $_clickScrollToTop () {
      if (typeof window !== 'undefined') {
        const doc = document.documentElement
        const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
        if (top > 0) {
          $([document.documentElement, document.body]).animate({
            scrollTop: 0
          }, 'slow')
        }
      }
    }
  }
}
