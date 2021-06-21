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
import MomoList from '~account/momo-list'
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
    MomoList,
    BankInfo,
    PromotionPackage
  },
  data () {
    return {
      formData: {
        method: 'momo',
        amount: 0,
        amount_deposit_mask: '',
        package_id: 0,
        bank_trancode: '',
        from_bank_no: this.$store.state.currentUser.phone,
        from_bank_name: '',
        withdraw_bank_code: '',
        withdraw_bank_no: ''
      },
      accountSelected: null
    }
  },
  computed: {
    ...mapState(['banks', 'momos', 'packages'])
  },
  methods: {
    submit () {
      const refs = ['bankCode', 'fromBankNo', 'amount', 'bankTrancode', 'withdrawBankCode', 'fromBankNameWithdraw', 'withdrawBankNo']
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }
      const requestData = {
        ...this.formData,
        amount: this.$options.filters.formatMarkToNumber(this.formData.amount_deposit_mask, 1000),
        to_bank_no: this.accountSelected.account_no,
        to_bank_name: this.accountSelected.account_name,
        from_bank_name: this.formData.from_bank_name || this.$store.state.currentUser.fullname
      }
      this.$_accountMixin_submit(requestData, ACCOUNT_API.DEPOSIT_MOMO, 'deposit')
    }
  }
}
