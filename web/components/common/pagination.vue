<template>
  <ul class="pagination" :class="model">
    <li v-if="page > intervalNext" class="page-item page-item--arrow page-item--prev" @click.prevent="prevPage()">
      <a class="page-link" href="#">
        <img v-if="model === 'dark'" :src="require('~imageAsset/common/arrow-dark.svg')" alt="prev">
        <img v-else :src="require('~imageAsset/common/arrow.svg')" alt="prev">
      </a>
    </li>
    <li v-for="item in pages" :key="item" class="page-item" :class="{ active: item === page }" @click.prevent="loadPage(item)">
      <span v-if="item === page">{{ item }}</span>
      <a v-else class="page-link" href="#">{{ item }}</a>
    </li>
    <li v-if="page <= totalPage - intervalPrevious" class="page-item page-item--arrow page-item--next" @click.prevent="nextPage()">
      <a class="page-link" href="#">
        <img v-if="model === 'dark'" :src="require('~imageAsset/common/arrow-dark.svg')" alt="next">
        <img v-else :src="require('~imageAsset/common/arrow.svg')" alt="next">
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
  props: {
    model: {
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 1
    },
    reset: {
      type: Boolean,
      default: false
    },
    margin: {
      type: Number,
      default: 2
    },
    intervalNext: {
      type: Number,
      default: 1
    },
    intervalPrevious: {
      type: Number,
      default: 1
    },
    rangeIntervalPagBar: {
      type: Number,
      default: 4
    },
    paramInUrl: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pages: [],
      currentPage: 1
    }
  },
  computed: {
    totalPage () {
      return this.totalPages()
    },
    page () {
      if (this.paramInUrl) {
        return this.paramUrlPage()
      }
      return this.currentPage
    }
  },
  watch: {
    page () {
      this.setPage()
    },
    total () {
      this.setPage()
    },
    reset () {
      if (this.reset === true) {
        this.currentPage = 1
      }
    }
  },
  mounted () {
    this.setPage()
  },
  methods: {
    setPage () {
      let startPage = this.page - this.margin
      startPage = startPage < 1 ? 1 : startPage
      let endPage = this.page + this.margin
      if (this.page - startPage < this.margin) {
        endPage = this.rangeIntervalPagBar
      }
      if (endPage > this.totalPage) {
        endPage = this.totalPage
        if (endPage <= this.rangeIntervalPagBar) {
          startPage = 1
        } else if (endPage - this.page < this.margin) {
          startPage = endPage - this.rangeIntervalPagBar + 1
        }
      }

      this.pages = []
      for (let i = startPage; i <= endPage; i++) {
        this.pages[i - startPage] = i
      }
    },
    totalPages () {
      return Math.ceil(this.total / this.perPage)
    },
    paramUrlPage () {
      return (this.$getRoute(this.$route).query && Number(this.$getRoute(this.$route).query.page)) || 1
    },
    prevPage () {
      this.loadPage(this.page - this.intervalNext)
    },
    nextPage () {
      this.loadPage(this.page + this.intervalNext)
    },
    loadPage (val) {
      this.$emit('handle-page', val)
      if (this.paramInUrl) {
        this.$router.push({ query: { page: val } })
      } else {
        this.currentPage = val
      }
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/common/pagination.scss"></style>
