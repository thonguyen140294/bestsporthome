<template>
  <component :is="component" />
</template>

<script>
import Desktop from '~/components/pages/account/change-password'
import simplePageMixin from '~/mixins/simple-page'

export default {
  layout: 'default',
  mixins: [simplePageMixin],
  data () {
    return {
      component: Desktop
    }
  }
}
</script>

<style></style>
