<template>
  <component :is="selectedComponent" />
</template>

<script>

import categoryPostsMixin from '@/mixins/news/category-posts'

export default {
  mixins: [categoryPostsMixin]
}
</script>

<style src="static/vendor/toc/css/toc.min.css"></style>
