import USER_API from '@/api/user'
import globalMixin from '@/mixins/global-mixin'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import { ICON_ERROR } from '~/config/constant'
import ACCOUNT_API from '~/api/account'

dayjs.extend(weekday)

export default {
  components: {
  },
  mixins: [globalMixin],
  props: {
  },
  data () {
    return {
      planType: {
        commission: 1,
        welcome: 2,
        first_50: 3,
        promotion: 4,
        saturday: 5,
        bonus: 6
      }
    }
  },
  computed: {
    isWelcomeType () {
      if (!this.promotion.plan) {
        return false
      }
      return this.promotion.plan.package_id === this.planType.welcome || this.promotion.plan.package_id === this.planType.promotion
    },
    isCommissionType () {
      if (!this.promotion.plan) {
        return false
      }
      return this.promotion.plan.package_id === this.planType.commission
    },
    isVisibleSaturday () {
      return dayjs().weekday() === 6
    },
    filterPackageOnSaturday () {
      return this.packages.filter((item) => {
        if (this.planType.saturday === item.id) {
          return this.isVisibleSaturday
        }
        return true
      })
    },
    filterPackageVisible () {
      const listPromoPackage = this.filterPackageOnSaturday
      const packageId = this.promotion?.plan?.package_id

      if (!packageId) {
        return listPromoPackage.filter(item => item.id !== this.planType.promotion)
      }
      if (packageId === this.planType.commission) {
        return listPromoPackage.filter((item) => {
          return [this.planType.commission, this.planType.promotion, this.planType.saturday].includes(item.id)
        })
      }
      if (packageId === this.planType.bonus) {
        return listPromoPackage.filter(item => item.id !== this.planType.promotion && item.id !== this.planType.bonus)
      }
      return []
    },
    visibleRollingChart () {
      if (!this.promotion.plan) {
        return false
      }
      return [this.planType.welcome, this.planType.promotion,
        this.planType.saturday, this.planType.first_50].includes(this.promotion.plan.package_id)
    }
  },
  methods: {
    async $_promotionMixin_fetchPlan (callback) {
      try {
        const { status, data } = await this.$axios.$get(USER_API.ACCOUNT_PLAN)
        if (status === 'OK' && data) {
          this.$store.commit('updatePromotion', data)
          if (callback) {
            callback(data)
          }
        }
      } catch (error) {
        this.$store.commit('updatePromotion', {})
      }
    },
    $_promotionMixin_confirm () {
      const text = document.createElement('p')
      text.innerHTML = 'Sau khi hủy gói khuyến mãi, tài khoản của bạn sẽ là <span class="note"><b>0 Đ</b> (Bao gồm nạp tiền và khuyến mãi)</span>'
      this.$swal({
        html: true,
        className: 'swal-cancel-promotion',
        title: 'HỦY KHUYẾN MÃI',
        content: text,
        icon: ICON_ERROR.notify,
        buttons: {
          close: {
            text: 'X',
            value: false,
            className: 'swal-close',
            visible: true,
            closeModal: true
          },
          cancel: {
            text: 'BỎ QUA',
            value: false,
            className: 'swal-cancel',
            visible: true,
            closeModal: true
          },
          confirm: {
            text: 'HỦY KHUYẾN MÃI',
            value: true,
            className: 'swal-accept',
            visible: true,
            closeModal: true
          }
        },
        dangerMode: true
      }).then((submitCancel) => {
        if (submitCancel) {
          this.$_promotionMixin_cancel()
        }
      })
    },
    async $_promotionMixin_cancel () {
      try {
        const response = await this.$axios.$put(USER_API.CANCEL_PROMOTION)
        if (response && response.status === 'OK') {
          this.$_promotionMixin_fetchPlan()
          this.$_fetchPromotion_packages()
          this.$swal({
            title: 'THÀNH CÔNG',
            text: 'Hủy khuyến mãi thành công',
            icon: 'success',
            timer: 1000,
            button: false
          })
        } else {
          this.$swal({
            title: 'LỖI',
            text: response.message,
            icon: 'error',
            dangerMode: true,
            button: 'ĐỒNG Ý'
          })
        }
      } catch (error) {
        this.$showError({ error })
      }
    },
    async $_fetchPromotion_packages () {
      try {
        const { status, data } = await this.$axios.$get(ACCOUNT_API.PROMOTION_PACKAGE)
        if (status === 'OK' && data) {
          this.$store.commit('updatePackages', data)
        }
      } catch (error) {
        return false
      }
    },
    showPackageOnSaturday (item) {
      if (this.planType.saturday === item.id) {
        return this.isVisibleSaturday
      }
      return true
    },
    isShowBankNote (packageId) {
      const hasPackage = this.filterPackageVisible.some(item => item.id === packageId)
      return hasPackage && packageId !== this.planType.commission
    }
  }
}
