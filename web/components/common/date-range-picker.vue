<template>
  <client-only placeholder="loading...">
    <date-range-picker
      ref="picker"
      :date-range="value"
      :locale-data="localeDate"
      :single-date-picker="false"
      :show-dropdowns="false"
      :auto-apply="true"
      :ranges="false"
      :linked-calendars="false"
      :always-show-calendars="true"
      :control-container-class="inputClass"
      :opens="openAlign"
      @select="selectDate"
      @update="selectDate"
    >
      <template v-slot:input="picker" style="width: 100%">
        {{ formatDisplayDate(picker.startDate) }} - {{ formatDisplayDate(picker.endDate) }}
      </template>
    </date-range-picker>
  </client-only>
</template>
<script>
import dayjs from 'dayjs'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  components: {
    DateRangePicker
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        startDate: new Date(),
        endDate: new Date()
      })
    },
    displayFormat: {
      type: String,
      default: 'DD-MM-YYYY'
    },
    inputClass: {
      type: String,
      default: ''
    },
    openAlign: {
      type: String,
      default: 'center'
    }
  },
  data () {
    return {
      localeDate: {
        direction: 'ltr',
        format: 'DD-MM-YYYY HH:mm:ss',
        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        monthNames:
          [
            'Tháng một',
            'Tháng hai',
            'Tháng ba',
            'Tháng tư',
            'Tháng năm',
            'Tháng sáu',
            'Tháng bảy',
            'Tháng tám',
            'Tháng chín',
            'Tháng mười',
            'Tháng mười một',
            'Tháng mười hai'
          ],
        firstDay: 1
      },
      disabledDates: {}
    }
  },
  methods: {
    formatDisplayDate (val) {
      return dayjs(val).format(this.displayFormat)
    },
    selectDate (val) {
      this.$emit('input', val)
    }
  }
}
</script>
