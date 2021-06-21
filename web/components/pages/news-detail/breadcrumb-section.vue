<template>
  <div class="breadcrumb">
    <p class="breadcrumb-item">
      <nuxt-link to="/tin-tuc">TIN TỨC</nuxt-link>
    </p>
    <p v-if="parentCategoryData" class="breadcrumb-item">
      <nuxt-link :to="'/' + parentCategoryData.slug"> {{ parentCategoryData.name }}</nuxt-link>
    </p>
    <p class="breadcrumb-item active">
      {{ categoryData.name.normalize('NFC') }}
    </p>
  </div>
</template>

<script>
export default {
  inject: ['parentCategoryData', 'categoryData']
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/news-detail/breadcrumb-section.scss"></style>
