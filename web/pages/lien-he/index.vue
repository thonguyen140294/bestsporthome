<template>
  <component :is="component" />
</template>
<script>
import Desktop from '~pages/contact/index'
import simplePageMixin from '~/mixins/simple-page'

export default {
  layout: 'default',
  components: {
    Desktop
  },
  mixins: [simplePageMixin],
  beforeCreate () {
    this.component = 'Desktop'
  }
}
</script>
