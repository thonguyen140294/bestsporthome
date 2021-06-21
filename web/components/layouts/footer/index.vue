<template>
  <footer class="footer">
    <LicenseSection />
    <!-- <MiddleSection /> -->
    <BottomSection />
    <!-- <SupportSection /> -->
    <div class="copyright">
      <p>© Bản quyền thuộc về Bestsporthome.</p>
    </div>
  </footer>
</template>

<script>
import LicenseSection from './license-section'
// import MiddleSection from './middle-section'
import BottomSection from './bottom-section'
// import SupportSection from './support-section'

export default {
  components: {
    LicenseSection,
    // MiddleSection,
    BottomSection
    // SupportSection
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/footer/index.scss">
</style>
