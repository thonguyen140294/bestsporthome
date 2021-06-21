export default {
  mounted () {
    if (typeof window !== 'undefined') {
      window.onNuxtReady(() => {
        document.getElementById('page').classList.add('page--simple')
      })
    }
    if (process.client) {
      this.$nextTick(() => {
        document.getElementById('page').classList.add('page--simple')
      })
    }
  },
  destroyed () {
    document.getElementById('page').classList.remove('page--simple')
  }
}
