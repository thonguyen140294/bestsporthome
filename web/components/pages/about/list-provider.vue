<template>
  <div class="list-provider">
    <div v-for="provider in providers" :key="provider.id" class="list-provider__item">
      <img :src="provider.img" alt="Provider">
    </div>
  </div>
</template>
<script>
import { listProvider } from '~/resources/about'
import navigateMixin from '~/mixins/navigation'
import { IFRAME_GAME_URLS } from '~/config/page-url'

export default {
  mixins: [navigateMixin],
  data () {
    return {
      providers: listProvider
    }
  },
  methods: {
    handleClickGame (item) {
      let loginRequired = false
      let newTab = false
      if (item.link === IFRAME_GAME_URLS.ESPORTS) {
        loginRequired = true
        newTab = this.$device.isMobileOrTablet
      }
      this.$_navigationMixin_navigate(item.link, loginRequired, newTab, item.mainWallet)
    }
  }
}
</script>
<style lang="scss" src="~scssAsset/pages/about/list-provider.scss">
</style>
