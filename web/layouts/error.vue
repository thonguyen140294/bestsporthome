<template>
  <component :is="component" />
</template>

<script>
import Desktop from '~pages/error/index'

export default {
  components: {
    Desktop
  },
  layout: 'error',
  beforeCreate () {
    this.component = 'Desktop'
  }
}
</script>
