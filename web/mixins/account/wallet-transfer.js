import ACCOUNT_API from '~/api/account'
import globalMixin from '~/mixins/global-mixin.js'

export default {
  mixins: [globalMixin],
  methods: {
    async $_walletTransferMixin_submit (balanceMain, callback) {
      const amount = Math.abs(this.globalMainBalance - balanceMain)
      if (!amount) { return }
      const payload = {
        amount,
        direction: this.globalMainBalance > balanceMain ? 0 : 1
      }
      try {
        this.$_globalMixin_loading()
        const response = await this.$axios.$post(ACCOUNT_API.TRANSFER_WALLET, payload)
        if (response && response.status === 'OK') {
          this.$swal({
            title: 'THÀNH CÔNG!',
            text: 'Chuyển ví thành công',
            icon: 'success',
            timer: 1000,
            button: false
          })
          if (callback) {
            callback()
          }
          this.$store.commit('updateBalance', balanceMain)
          this.$store.commit('updateSubBalance', this.globalTotalBalance - balanceMain)
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
        this.$_globalMixin_load()
        this.$showError({
          title: 'Chuyển ví thất bại',
          error: 'Vui lòng thử lại',
          icon: 'error'
        })
      }
    }
  }
}
