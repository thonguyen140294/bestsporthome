<template>
  <div>
    <SportCenterSection />
		<QuickRegisterSection v-show="!isLogged" />
    <HotKitSection />
  </div>
</template>

<script>

export default {
  components: {
    SportCenterSection: () => import('./sport-center-section'),
    HotKitSection: () => import('./hot-kit-section'),
    QuickRegisterSection: () => import('./quick-register-section')
  },
  computed: {
    isLogged () {
      return this.$store.getters.isLogged
    }
  }
}
</script>
