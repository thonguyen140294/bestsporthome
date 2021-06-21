<template>
  <div>
    <div class="accordion" role="tablist">
      <b-card v-for="(faq, index) in faqDataPagination" :key="index" no-body class="card">
        <b-card-header header-tag="header" class="card-header p-1" role="tab">
          <button
            v-b-toggle="'accordion-' + index"
            class="btn btn-link"
            type="button"
          >
            <span>{{ faq.title }}</span>
            <i />
          </button>
        </b-card-header>
        <b-collapse :id="`accordion-${index}`" :visible="faq.id === 1" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="collapse show">
              <p v-html="faq.desc" />
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <nav aria-label="navigation">
      <Pagination
        v-if="getFaqData.length > 8"
        :total="getFaqData.length"
        :per-page="per_page"
        @handle-page="handlePage"
      />
    </nav>
  </div>
</template>
<script>
import Pagination from '~common/pagination'
import faqPagination from '~/mixins/faq/pagination'

export default {
  components: {
    Pagination
  },
  mixins: [faqPagination],
  props: {
    faqData: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped lang="scss" src="~scssAsset/pages/faq/index.scss">
</style>
