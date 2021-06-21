import { mapState } from 'vuex'
import ACCOUNT_API from '~/api/account'
import validateMixin from '~/mixins/validate'
import accountMixin from '~/mixins/account/index'

import BaseInput from '~common/base-input'
import BaseButton from '~common/base-button'

import WrapperTitle from '~account/wrapper-title'
import BankCardList from '~account/bank-card-list'
import BankList from '~account/bank-list'

export default {
  mixins: [validateMixin, accountMixin],
  components: {
    BaseInput,
    BaseButton,
    WrapperTitle,
    BankList,
    BankCardList
  },
  data () {
    return {
      formData: {
        amount: 0,
        amount_withdraw_mask: '',
        to_bank_no: '',
        to_bank_name: ''
      },
      bankSelected: {
        bank_code: '',
        bank_name: ''
      }
    }
  },
  computed: {
    ...mapState(['userBanks', 'banks']),
    withoutBankAccountNo () {
      return this.bankSelected.bank_account_no === ''
    }
  },
  methods: {
    submit () {
      let refs = this.userBanks.length ? ['bankCode', 'amount'] : ['bankCode', 'amount', 'toBankNo', 'toBankNanme']
      if (this.withoutBankAccountNo) {
        refs = [...refs, 'toBankNo']
      }
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }

      const requestData = {
        ...this.formData,
        amount: this.$options.filters.formatMarkToNumber(this.formData.amount_withdraw_mask, 1000),
        to_bank_code: this.bankSelected.bank_code
      }

      if (this.userBanks.length) {
        requestData.to_bank_no = this.withoutBankAccountNo ? this.formData.to_bank_no : this.bankSelected.bank_account_no
        requestData.to_bank_name = this.bankSelected.bank_account_name
      }

      this.$_accountMixin_submit(requestData, ACCOUNT_API.WITHDRAW_BANK, 'withdraw')
    }
  }
}
