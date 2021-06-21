import { mapState } from 'vuex'
import ACCOUNT_API from '~/api/account'
import validateMixin from '~/mixins/validate'
import accountMixin from '~/mixins/account/index'
import promotionMixin from '~/mixins/promotion'

import BaseRadio from '~common/base-radio'
import BaseSelect from '~common/base-select'
import BaseInput from '~common/base-input'
import BaseButton from '~common/base-button'

import WrapperTitle from '~account/wrapper-title'
import BankList from '~account/bank-list'
import BankInfo from '~account/bank-info'
import PromotionPackage from '~account/promotion-package'

export default {
  mixins: [validateMixin, accountMixin, promotionMixin],
  components: {
    BaseRadio,
    BaseSelect,
    BaseInput,
    BaseButton,
    WrapperTitle,
    BankList,
    BankInfo,
    PromotionPackage
  },
  data () {
    return {
      formData: {
        method: 'smartpay',
        amount: 0,
        from_bank_name: '',
        amount_deposit_mask: '',
        package_id: 0,
        back_link: `${window.location.origin}/account?tab=history-transaction`,
        withdraw_bank_no: ''
      },
      bankSelected: {
        bank_code: '',
        bank_name: ''
      }
    }
  },
  computed: {
    ...mapState(['banks', 'packages'])
  },
  methods: {
    submit () {
      const refs = ['bankCode', 'amount', 'fromBankNameWithdraw', 'withdrawBankNo']
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }
      const requestData = {
        ...this.formData,
        from_bank_name: this.formData.from_bank_name || this.$store.state.currentUser.fullname,
        amount: this.$options.filters.formatMarkToNumber(this.formData.amount_deposit_mask, 1000),
        bank_code: this.bankSelected.bank_code,
        withdraw_bank_code: this.bankSelected.bank_code
      }
      this.$_accountMixin_submit(requestData, ACCOUNT_API.DEPOSIT_PAYWIN, 'deposit')
    }
  }
}
