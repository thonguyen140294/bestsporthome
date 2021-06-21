<template>
  <keep-alive>
    <component :is="component" />
  </keep-alive>
</template>

<script>
import Desktop from '~pages/about/index'
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

<style></style>
