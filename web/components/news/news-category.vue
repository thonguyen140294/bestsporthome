<template>
  <div class="news-category">
    <div class="news-category__title">
      DANH MỤC
    </div>
    <ul class="news-category__content">
      <template
        v-for="category in categories"
      >
        <li :key="category.id">
          <span @click="handleClick(category.slug)">{{ category.name.normalize('NFC') }}</span>
          <ul>
            <li
              v-for="sub_category in category.sub_categories"
              :key="sub_category.id"
              @click="handleClick(sub_category.slug)"
            >
              {{ sub_category.name }}
            </li>
          </ul>
        </li>
        <hr :key="`hr${category.id}`">
      </template>
    </ul>
  </div>
</template>
<script>
import globalMixin from '~/mixins/global-mixin'
export default {
  mixins: [globalMixin],
  inject: ['categories'],
  methods: {
    handleClick (value) {
      this.$router.push(`/${value}`)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/news/news-category.scss"></style>
