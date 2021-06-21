import $ from 'jquery'

export default {
  data () {
    return {
      wrapTab: '',
      tab: '',
      tabCurrent: ''
    }
  },
  methods: {
    selectScrollTab () {
      if ($(this.tabCurrent) && $(this.wrapTab)) {
        const wrapTabWidth = $(this.wrapTab)[0]?.offsetWidth || 0
        const centerPoint = wrapTabWidth / 2
        const currentTabElement = $(this.tabCurrent)
        const currentCenterPoint = currentTabElement[0]?.offsetLeft + currentTabElement[0]?.offsetWidth / 2
        let scrollLeft = 0

        if (currentCenterPoint > centerPoint) {
          scrollLeft = centerPoint - currentCenterPoint
        }
        if (currentCenterPoint <= centerPoint) {
          scrollLeft = 0
        }
        $(this.tab).animate({ scrollLeft: -scrollLeft }, 200)
      }
    },
    selectScrollTabGameItem () {
      setTimeout(() => {
        this.wrapTab = '.game-menu-list'
        this.tab = '.nav'
        this.tabCurrent = '.game-menu-item__link.nuxt-link-exact-active.nuxt-link-active.active'
        this.selectScrollTab()
      }, 200)
    },
    selectTabAbout () {
      setTimeout(() => {
        this.wrapTab = this.tab = '.about__menu'
        this.tabCurrent = '.nav-item.nav-link.active'
        this.selectScrollTab()
      }, 200)
    },
    selectTabNews () {
      setTimeout(() => {
        this.tab = this.wrapTab = '.news-nav'
        this.tabCurrent = '.nuxt-link-exact-active.nuxt-link-active.news-nav__link'
        this.selectScrollTab()
      }, 200)
    }
  }
}
