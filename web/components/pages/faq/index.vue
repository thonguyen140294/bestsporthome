<template>
  <section class="section">
    <div class="faq">
      <div class="faq__banner">
        <div class="container">
          <h3 class="faq__hdg">
            <span>Câu hỏi</span> thường gặp
          </h3>
        </div>
      </div>
      <div class="container faq__container">
        <div class="faq__inner">
          <BaseInput
            ref="search"
            v-model="search_faq"
            type="text"
            placeholder="Tìm kiếm câu hỏi..."
            class-name="base-input--search"
            @input="searchFaq"
          >
            <i @click="searchFaq" />
          </BaseInput>
          <div class="nav faq__menu">
            <a
              v-for="tab in faqItems"
              :key="`tab_${tab}_${tab.id}`"
              :class="['nav-item nav-link', { 'active': tab_selected === tab.id }]"
              data-toggle="tab"
              href="javascript:void(0)"
              role="tab"
              @click="tab_selected = tab.id"
            >{{ tab.text }}</a>
          </div>
        </div>
        <div class="faq__content">
          <div class="tab-content">
            <transition name="fade" mode="out-in">
              <ListFaq :key="tab_selected" :faq-data="getFaqData" />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ListFaq from './list-faq'
import BaseInput from '~common/base-input'
import globalMixin from '~/mixins/global-mixin'
import { faqTabs } from '~/resources/faq'

export default {
  components: {
    ListFaq,
    BaseInput
  },
  mixins: [globalMixin],
  data () {
    return {
      tab_selected: 1,
      faqItems: faqTabs,
      search_faq: ''
    }
  },
  computed: {
    getFaqData () {
      let faqItemList = this.faqItems
      if (this.search_faq) {
        faqItemList = this.searchFaq()
      }
      faqItemList = faqItemList.filter(({ id }) => {
        return id === this.tab_selected
      })
      return faqItemList
    }
  },
  methods: {
    searchFaq () {
      return this.faqItems.map((faq) => {
        return {
          ...faq,
          current_page: 1,
          items: faq.items.filter(({ title }) => title.toLowerCase().includes(this.search_faq.toString().toLowerCase()))
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/faq/index.scss">
</style>
