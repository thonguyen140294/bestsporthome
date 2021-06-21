<template>
  <div class="history-filters">
    <div v-if="filters" class="history-filters__stt">
      <span>TRẠNG THÁI</span>
      <a v-for="(item, key) in filters" :key="key" href="#" :class="{'active': key === data.active}" @click.prevent="handleActive(key)">{{ item }}</a>
    </div>
    <div class="history-filters__form">
      <client-only>
        <DateRangePicker
          v-model="data.dateRange"
          display-format="DD/MM/YYYY"
          open-align="left"
          input-class="input history-filters__date-range"
        />
      </client-only>
      <BaseButton class="base-button--bg-red" @click="handleEmit">TÌM KIẾM</basebutton>
    </div>
  </div>
</template>

<script>
import BaseButton from '~common/base-button'
import DateRangePicker from '~common/date-range-picker'
export default {
  components: {
    BaseButton,
    DateRangePicker
  },
  props: {
    filters: {
      type: Object,
      default: () => {}
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
    handleEmit () {
      this.$emit('eventClick', this.data)
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/account/history-filters.scss"></style>
