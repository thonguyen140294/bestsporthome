<template>
  <img :src="getSrc " :alt="getAlt">
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getSrc () {
      if (this.media && this.media.source_url) {
        return this.media.source_url
      }

      return require('~imageAsset/common/thumbnail-error.jpg')
    },
    getAlt () {
      return this.media && this.media.alt_text
    }
  }
}
</script>
