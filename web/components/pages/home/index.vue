<template>
  <div>
    <SportCenterSection />
		<QuickRegisterSection v-show="!isLogged" />
    <CasinoSection />
    <NewsSection />
  </div>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import jackpotMixin from '~/mixins/jackpot'

export default {
  components: {
    SportCenterSection: () => import('./sport-center-section'),
    CasinoSection: () => import('./casino-section'),
    QuickRegisterSection: () => import('./quick-register-section'),
    NewsSection: () => import('./news-section')
  },
  mixins: [jackpotMixin],
  computed: {
    isLogged () {
      return this.$store.getters.isLogged
    }
  },
  mounted () {
    if (!this.$store.state.isBotChromeLighthouse && isEmpty(this.$store.state.jackpot)) {
      this.$_jackpotMixin_GetListJackpot()
    }
  }
}
</script>
