<template>
  <section class="about-section">
    <div class="about-wrapper about-section__order" ref="about-wrapper">
      <div class="about">
        <div :class="['tab-content', { 'tab-content-about': tab_selected === 'About' }]">
          <div id="nav_about" class="nav about__menu">
            <a
              v-for="tab in tabs"
              :key="tab.id"
              :class="[
                'nav-item nav-link',
                { 'active': tab_selected === tab.component }
              ]"
              href="javascript:void(0)"
              @click.prevent="clickSelectTab(tab)"
            >{{ tab.name }}</a>
          </div>
          <div
            class="about__tab tab-pane show active"
          >
            <transition name="fade">
              <component :is="tab_selected" />
            </transition>
          </div>
          <div v-if="this.$device.isMobile && tab_selected === 'About'" class="tab-about-bg-gradient" />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import $ from 'jquery'
import About from '~pages/about/about-section'
import globalMixin from '~/mixins/global-mixin'
import scrollTabMixin from '~/mixins/scroll-tab'
import { ABOUT_US_URLS } from '~/config/page-url'
import Info from '~pages/about/info'
import ListProvider from '~pages/about/list-provider'

export default {
  components: {
    About,
    Promo: () => import('~pages/about/promo-section'),
    Security: () => import('~pages/about/security-section'),
    Policy: () => import('~pages/about/policy-section'),
    Method: () => import('~pages/about/method-section'),
    Info,
    ListProvider
  },
  mixins: [globalMixin, scrollTabMixin],
  data () {
    return {
      tab_selected: 'About',
      aboutUrl: ABOUT_US_URLS,
      tabs: [
        { id: 1, name: 'Về chúng tôi', component: 'About', tab: 've-chung-toi' },
        { id: 2, name: 'Điều khoản và điều kiện', component: 'Policy', tab: 'dieu-khoan-dieu-kien' },
        { id: 3, name: 'Chính sách bảo mật', component: 'Security', tab: 'chinh-sach-bao-mat' },
        { id: 4, name: 'Khuyến mãi', component: 'Promo', tab: 'khuyen-mai' },
        { id: 5, name: 'Phương thức thanh toán', component: 'Method', tab: 'phuong-thuc-thanh-toan' }
      ]
    }
  },
  watch: {
    '$route.query.tab': {
      handler () {
        this.handleTabAboutSelected()
      }
    }
  },
  created () {
    this.tab_selected = this.tabs.find(tab => tab.tab === this.$route.query.tab)?.component || this.tab_selected
  },
  mounted () {
    this.handleTabAboutSelected()
  },
  methods: {
    handleTabAboutSelected () {
      this.tabs = this.tabs.map((tab, index) => {
        const urls = Object.values(this.aboutUrl)
        if (this.$route.fullPath === urls[index]) {
          this.tab_selected = tab.component
        }
        return {
          ...tab,
          url: urls[index]
        }
      })
      this.selectTabAbout()
    },
    clickSelectTab (tab) {
      if (tab) {
        this.tab_selected = tab.component
        this.$router.push({ query: { tab: tab.tab }, params: { savePosition: true } })
        this.goToAboutSection(tab.tab)
        if (process.client) {
          this.selectTabAbout()
        }
      }
    },
    goToAboutSection (refName) {
      const element = this.$refs['about-wrapper']
      if (element) {
        let delayTime = 1000
        // If scroll's current position is the same with position of tabs, not delay show tab
        if (document.documentElement.scrollTop === element.offsetTop - 220) {
          delayTime = 0
        }
        $([document.documentElement, document.body]).animate({
          scrollTop: element.offsetTop - 220
        }, delayTime)
      }
    }
  }
}
</script>
<style lang="scss" src="~scssAsset/pages/about/index.scss">
</style>
