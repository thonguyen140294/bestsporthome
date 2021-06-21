import Vue from 'vue'
import vueAwesomeCountdown from 'vue-awesome-countdown'
import get from 'lodash/get'
import slice from 'lodash/slice'
import includes from 'lodash/includes'
import isInteger from 'lodash/isInteger'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import { ICON_ERROR } from '~/config/constant'
dayjs.extend(customParseFormat)
dayjs.extend(utc)

Vue.use(vueAwesomeCountdown, 'AwesomeCountdown')
Vue.filter('formatAmountUnit', (str, divider = 1000) => {
  if (str) {
    const amount = parseFloat(Number(str) / divider)
    return amount.toLocaleString('de-DE')
  }
  return 0
})

Vue.filter('formatDate', (value) => {
  if (value && isInteger(value)) {
    return dayjs.unix(value).format('DD/MM/YYYY')
  } else if (value) {
    return dayjs(value, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')
  }
})

Vue.filter('formatTime', (value) => {
  if (value && isInteger(value)) {
    return dayjs.unix(value).format('HH:mm')
  } else if (value) {
    return dayjs(value, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
  }
})
Vue.filter('formatLocalDateTime', (value, format) => {
  return value ? dayjs(value).format(format) : null
})

Vue.filter('formatMoney', (value, multiplier = 1) => {
  if (typeof value === 'string') {
    const amount = Number(value.replace(/,/g, '')) * multiplier
    return amount.toLocaleString('en-US')
  }
  return value.toLocaleString('en-US')
})

Vue.filter('formatMarkToNumber', (str, multiplier = 1) => {
  if (str) {
    return Number(str.replace(/,/g, '')) * multiplier
  }
  return 0
})

Vue.filter('getSlice', (str, start, end) => {
  return slice(str, start, end)
})

Vue.prototype.$showError = function (payload) {
  const error = payload.error
  let title = payload.title
  let icon = payload.icon
  let button = payload.button
  const url = payload.url

  let message = 'Lỗi hệ thống! Vui lòng thử lại sau.'
  if (error && error.response && error.response.data) {
    message = get(error, 'response.data.message')
  } else if (error && error.message) {
    switch (error.code) {
      case 301:
        message = 'Bạn đã nạp 3 lần, vui lòng chờ xử lí xong'
        break
      default:
        message = error.message
    }
    if (message === 'Network Error') {
      icon = 'connect'
      title = 'MẤT KẾT NỐI'
      message = 'Vui lòng kiểm tra đường truyền mạng'
      button = 'đóng'
    }
  } else if (error) {
    message = error
  }

  this.$swal({
    title: title || 'LỖI',
    text: message,
    icon: includes(Object.keys(ICON_ERROR), icon) ? ICON_ERROR[icon] : ICON_ERROR.warning,
    dangerMode: true,
    closeOnClickOutside: !url,
    buttons: {
      close: {
        text: 'X',
        className: 'swal-close'
      },
      confirm: {
        text: button || 'đóng',
        className: 'swal-confirm'
      }
    }
  }).then((value) => {
    if (value === true && url) {
      location.href = url
    } else if (url) {
      location.href = '/'
    }
  })
}
