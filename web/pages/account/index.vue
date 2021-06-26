<template>
  <component :is="component" />
</template>

<script>
import Desktop from '~/components/pages/account/index'
import Mobile from '~/components/pages/account/sp/index'
import simplePageMixin from '~/mixins/simple-page'

export default {
  layout: 'default',
  middleware: 'auth',
  mixins: [simplePageMixin],
  data () {
    return {
      component: Desktop
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.getElementById('page').classList.add('page--account')
    })
    this.component = window.innerWidth <= 980 ? Mobile : Desktop
    window.addEventListener('resize', this.onResize)
  },
  destroyed () {
    document.getElementById('page').classList.remove('page--account')
  },
  methods: {
    onResize () {
      this.component = window.innerWidth <= 980 ? Mobile : Desktop
    }
  }
}
</script>

<style></style>
