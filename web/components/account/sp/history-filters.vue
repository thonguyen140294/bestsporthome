<template>
  <div class="history-filters">
    <a href="#" class="history-filters__cta-filter" @click.prevent="openModal">
      <img :src="require('~imageAsset/account/sp/filter.svg')" alt="">
    </a>
    <HistoryModal :config="config">
      <template #title>Bộ lọc</template>
      <template #content>
        <div class="history-filters__form">
          <DateRangePicker
            v-model="data.dateRange"
            display-format="DD/MM/YYYY"
            open-align="right"
            input-class="input history-filters__date-range"
          />
          <label class="history-filters__label">Khoảng thời gian</label>
        </div>
        <div v-if="filters" class="radio-filter">
          <p class="radio-filter__title">Trạng thái</p>
          <div class="radio-filter__content">
            <div
              v-for="(item, key) in filters"
              :key="key"
              class="radio-filter__item"
              :class="{'active': key === data.active}"
              @click.prevent="handleActive(key)"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="history-filters__cta">
          <BaseButton class="base-button--bg-red base-button--full" @click="handleEmit">TÌM KIẾM</basebutton>
        </div>
      </template>
    </HistoryModal>
  </div>
</template>

<script>
import HistoryModal from './history-modal'
import BaseButton from '~common/base-button'
import DateRangePicker from '~common/date-range-picker'

export default {
  components: {
    BaseButton,
    DateRangePicker,
    HistoryModal
  },
  props: {
    filters: {
      type: Object,
      default: () => {
      }
    },
    config: {
      type: Object,
      default: () => {
      }
    },
    startdate: {
      type: Date,
      default: () => { return new Date() }
    }
  },
  data () {
    return {
      data: {
        dateRange: {
          startDate: this.startdate,
          endDate: new Date()
        },
        active: Object.keys(this.filters) && Object.keys(this.filters)[0]
      }
    }
  },
  methods: {
    handleActive (key) {
      this.data.active = key
    },
    openModal () {
      this.$root.$emit('bv::show::modal', this.config.id)
    },
    handleEmit () {
      this.$emit('eventClick', this.data)
      this.$root.$emit('bv::hide::modal', this.config.id)
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/account/sp/history-filters.scss"></style>
