export default {
  data () {
    return {
      isDesktop: true
    }
  },
  computed: {
    isDeviceDesktop () {
      return this.isDesktop && this.$device.isDesktopOrTablet
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.onResize()
    })
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize)
    }
  },
  methods: {
    onResize () {
      this.isDesktop = typeof window !== 'undefined' && window.innerWidth > 1200
    }
  }
}
