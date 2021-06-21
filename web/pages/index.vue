<template>
  <component :is="component" />
</template>

<script>
import Desktop from '~pages/home/index'

export default {
  layout: 'default',
  components: {
    Desktop
  },
  beforeCreate () {
    this.component = 'Desktop'
  }
}
</script>

<style></style>
