<template>
  <section class="quick-register-section">
    <div class="container">
      <div class="quick-register-section__slider">
        <Promotion :items="items" />
      </div>
      <div class="quick-register-section__register">
        <QuickRegisterForm />
      </div>
    </div>
  </section>
</template>

<script>
import Promotion from '~pages/home/promotion'
import QuickRegisterForm from '~user/quick-register-form'
import { PROMOTION } from '~/resources/promotion'

export default {
  components: {
    Promotion,
    QuickRegisterForm
  },
  data () {
    return {
      items: PROMOTION
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/home/quick-register-section.scss"></style>
