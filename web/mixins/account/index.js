import get from 'lodash/get'
import globalMixin from '~/mixins/global-mixin'
import promotionMixin from '~/mixins/promotion'
import ACCOUNT_API from '~/api/account'
import { ICON_ERROR, PROMOTION_PLAN_TYPE } from '~/config/constant'

export default {
  components: {
  },
  props: {
  },
  computed: {
    isPromotionPlanBonus () {
      return this.formData?.package_id === PROMOTION_PLAN_TYPE.BONUS
    },
    minInputDeposit () {
      return this.isPromotionPlanBonus ? 300 : 50
    },
    errorMinValueDeposit () {
      return this.isPromotionPlanBonus
        ? 'Số tiền nạp không đủ để hưởng khuyến mãi (từ 300k trở lên)'
        : 'Số tiền nạp tối thiểu là 50 Đ'
    }
  },
  mixins: [globalMixin, promotionMixin],
  methods: {
    async $_accountMixin_submit (requestData, apiPath, type) {
      if (type === 'withdraw' && this.$_accountMixin_invalidWithdraw()) { return }
      if (type === 'deposit' && this.isWelcomeType && this.globalTotalBalance <= 2) {
        this.$_accountMixin_confirmCancelPromotion()
        return
      }
      let openNewTab = null
      if (requestData.method === 'smartpay') {
        openNewTab = window.open('about:blank', '_blank')
      }
      try {
        this.$_globalMixin_loading()
        const response = await this.$axios.$post(apiPath, requestData)
        if (response && response.status === 'OK') {
          // redirect to smartpay link
          if (requestData.method === 'smartpay') {
            openNewTab.location.href = response.data.smartpay_link
          } else {
            setTimeout(() => {
              this.$router.push('/account?tab=history-transaction')
            }, 1000)
            this.$swal({
              title: 'THÀNH CÔNG!',
              text: this.$_accountMixin_getSuccessText(type),
              icon: 'success',
              closeOnClickOutside: false,
              timer: 1000,
              button: false
            })
          }
        } else {
          this.$swal({
            title: 'LỖI',
            text: response.message,
            icon: 'error',
            dangerMode: true,
            button: 'ĐỒNG Ý'
          })
        }
        this.$_globalMixin_load()
      } catch (error) {
        if (get(error, 'response.data.status') === 'UNKNOWN_ERROR') {
          this.$showError({
            title: 'Ngân hàng đang bảo trì',
            error: 'Vui lòng chọn ngân hàng khác',
            icon: 'error'
          })
        } else {
          this.$showError({ error })
        }
        if (requestData.method === 'smartpay') {
          openNewTab.close()
        }
        this.$_globalMixin_load()
      }
    },
    async $_accountMixin_getAccount (bankCode, callBack) {
      try {
        const { status, data } = await this.$axios.$get(ACCOUNT_API.BANK_ACCOUNT, { params: { bank_code: bankCode } })
        if (status === 'OK') {
          callBack(data)
        }
      } catch (error) {
        callBack(null)
        this.$showError({
          title: 'Ngân hàng đang bảo trì',
          error: 'Vui lòng chọn ngân hàng khác',
          icon: 'error'
        })
      }
    },
    $_accountMixin_formatAmount (amount) {
      return Number(amount.replace(/,/g, ''))
    },
    $_accountMixin_getSuccessText (type) {
      switch (type) {
        case 'deposit':
          return 'Tạo phiếu nạp thành công'
        case 'withdraw':
          return 'Tạo phiếu rút thành công'
      }
    },
    $_accountMixin_error (message) {
      this.$swal({
        title: 'LỖI',
        text: message,
        icon: 'error',
        dangerMode: true,
        button: 'ĐỒNG Ý'
      })
    },
    $_accountMixin_invalidWithdraw () {
      if (this.isWelcomeType) {
        this.$showError({
          title: 'Bạn đang sử dụng khuyến mãi',
          error: 'Bạn cần hoàn thành yêu cầu doanh thu cược, để được rút tiền',
          icon: 'promotion'
        })
        return true
      }
    },
    $_accountMixin_confirmCancelPromotion () {
      this.$swal({
        className: 'swal-deposit-promotion',
        title: 'THÔNG BÁO',
        text: 'Tạo phiếu nạp tiền sẽ yêu cầu việc hủy chương trình khuyến mãi hiện tại. Bạn có muốn tiếp tục?',
        icon: ICON_ERROR.dollar,
        buttons: {
          close: {
            text: 'X',
            value: false,
            className: 'swal-close',
            visible: true,
            closeModal: true
          },
          cancel: {
            text: 'Bỏ qua',
            value: false,
            className: 'swal-cancel',
            visible: true,
            closeModal: true
          },
          confirm: {
            text: 'ĐỒNG Ý',
            value: true,
            className: 'swal-accept',
            visible: true,
            closeModal: true
          }
        },
        dangerMode: true
      }).then((submitCancel) => {
        if (submitCancel) {
          this.$_promotionMixin_confirm()
        }
      })
    }
  }
}
