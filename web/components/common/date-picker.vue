<template>
  <client-only placeholder="loading...">
    <date-picker
      :value="displayDate"
      :input-class="[inputClass, 'date-input']"
      :format="formatDate"
      :disabled-dates="disabledDates"
      :language="language"
      @selected="selectedDate"
    />
  </client-only>
</template>
<script>
import { vi } from 'vuejs-datepicker/dist/locale'
import dayjs from 'dayjs'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: 'form-control input input--type-3'
    }
  },
  data () {
    return {
      language: vi,
      disabledDates: {}
    }
  },
  computed: {
    displayDate () {
      return this.value ? dayjs(this.value, 'DD-MM-YYYY').format('DD-MM-YYYY') : ''
    }
  },
  methods: {
    disabledDate (e, dir) {
      this.disabledDates = {}
      this.disabledDates[dir] = new Date(dayjs(e).format('YYYY, MM, DD'))
    },
    selectedDate (val) {
      this.$emit('input', dayjs(val).format('DD-MM-YYYY'))
    },
    formatDate (val) {
      return dayjs(val).format('DD-MM-YYYY')
    }
  }
}
</script>
