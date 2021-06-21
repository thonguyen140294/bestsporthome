import { mapState } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import uniqBy from 'lodash/uniqBy'
import ACCOUNT_API from '~/api/account'
import { TRANSCODE_PLACEHOLDER } from '~/resources/transcode-placeholder'
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
        method: 'banking',
        amount: 0,
        amount_deposit_mask: '',
        package_id: undefined,
        bank_trancode: '',
        from_bank_name: '',
        withdraw_bank_code: '',
        withdraw_bank_no: ''
      },
      bankSelected: {
        bank_code: '',
        bank_name: ''
      },
      bankAccount: null,
      methodOptions: [
        { label: 'Internet banking', value: 'banking' },
        { label: 'ATM', value: 'atm' },
        { label: 'Tại quầy', value: 'taiquay' }
      ],
      banksPlaceHolder: TRANSCODE_PLACEHOLDER,
      userBankSelected: undefined,
      selectBankAccountName: [],
      isDisableSender: false,
      disabledPromoBankName: false,
      isSelectName: false,
      isSelectBankName: false,
      isSelectBankNo: false,
      disabledPromoBankNo: false,
      findBankByCode: {}
    }
  },
  computed: {
    ...mapState(['banks', 'userBanks', 'packages']),
    bankTrancodePlaceholder () {
      if (!this.formData.method) {
        return ''
      }
      const methodData = this.banksPlaceHolder[this.formData.method]
      return methodData[this.bankSelected.bank_code]
    },
    isDisableTransCode () {
      return this.bankTrancodePlaceholder.includes('số TK ngân hàng') && !!this.userBankSelected
    },
    isInputTelType () {
      const bankRequireTimes = ['VietinBank', 'Sacombank']
      return (this.formData.method === 'atm' && !bankRequireTimes.includes(this.bankSelected.bank_code))
    }
  },
  watch: {
    '$route.query.type': {
      handler (value) {
        if (['banking', 'atm', 'taiquay'].includes(value)) {
          this.formData.method = value
        }
      },
      immediate: true
    },
    'formData.method': {
      handler () {
        this.settingAccountNo()
      }
    },
    bankSelected: {
      handler () {
        this.getBankDetail()
      }
    }
  },
  methods: {
    submit () {
      const refs = ['bankCode', 'fromBankName', 'selectBankCode', 'fromBankNameWithdraw', 'withdrawBankNo', 'amount', 'bankTrancodeTel', 'bankTrancodeText']
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }
      const requestData = {
        ...this.formData,
        amount: this.$options.filters.formatMarkToNumber(this.formData.amount_deposit_mask, 1000),
        bank_code: this.bankSelected.bank_code,
        withdraw_bank_code: this.bankSelected.bank_code,
        bank_trancode: this.bankTrancodePlaceholder ? this.formData.bank_trancode : ''
      }
      this.$_accountMixin_submit(requestData, ACCOUNT_API.DEPOSIT_BANK, 'deposit')
    },
    resetUserBank () {
      this.formData.bank_trancode = ''
      this.formData.withdraw_bank_no = ''
    },
    settingAccountNo () {
      if (this.userBankSelected) {
        this.formData.withdraw_bank_no = this.userBankSelected.bank_account_no
        if (this.bankTrancodePlaceholder.includes('số TK ngân hàng')) {
          this.formData.bank_trancode = this.userBankSelected.bank_account_no
        } else {
          this.formData.bank_trancode = ''
        }
      } else {
        this.resetUserBank()
      }
    },
    handleSelectBank (selectedBank) {
      if (selectedBank) {
        this.$_accountMixin_getAccount(selectedBank.bank_code, this.selectBankData)
      }
    },
    selectBankData (data) {
      if (!data) {
        this.bankSelected = {
          bank_code: '',
          bank_name: ''
        }
        this.bankAccount = null
      } else {
        this.$nextTick(() => {
          this.bankAccount = data
          const userBank = this.userBanks.find(item => item.bank_code === this.bankSelected.bank_code)
          this.userBankSelected = userBank
          this.settingAccountNo()
        })
      }
    },
    getBankDetail () {
      if (!isEmpty(this.userBanks)) {
        const bankCode = this.bankSelected.bank_code
        this.findBankByCode = this.userBanks.filter(function (o) { return o.bank_code === bankCode })
        if (!isEmpty(this.findBankByCode)) {
          this.selectBankAccountName = uniqBy(this.findBankByCode, 'bank_account_name')
          this.formData.withdraw_bank_no = this.findBankByCode[0].bank_account_no
          this.formData.from_bank_name = this.findBankByCode[0].bank_account_name
          if (this.selectBankAccountName.length === 1) {
            this.isDisableSender = true
            this.isSelectName = false
            this.disabledPromoBankName = true
            this.isSelectBankName = false
          } else {
            this.isDisableSender = false
            this.isSelectName = true
            this.disabledPromoBankName = false
            this.isSelectBankName = true
            this.formData.from_bank_name = this.findBankByCode[0].bank_account_name
          }
          this.disabledPromoBankNo = !isEmpty(this.formData.withdraw_bank_no)
        } else {
          this.formData.withdraw_bank_no = ''
          this.isSelectName = false
          this.isDisableSender = false
          this.isSelectBankName = false
          this.disabledPromoBankNo = false
          this.disabledPromoBankName = true
          this.formData.from_bank_name = this.userBanks[0].bank_account_name
          this.selectBankAccountName = uniqBy(this.userBanks, 'bank_account_name')
          if (this.selectBankAccountName.length > 1) {
            this.isSelectName = true
            this.isSelectBankName = true
            this.isDisableSender = false
            this.disabledPromoBankName = false
          } else {
            this.isSelectName = false
            this.isSelectBankName = false
            this.isDisableSender = true
            this.disabledPromoBankName = true
          }
        }
      }
    },
    changeBankName () {
      const bankName = this.formData.from_bank_name
      if (!isEmpty(this.findBankByCode)) {
        const findBankByBankNo = this.findBankByCode.find(function (o) { return o.bank_account_name === bankName })
        this.formData.withdraw_bank_no = findBankByBankNo.bank_account_no
        this.disabledPromoBankNo = !isEmpty(this.formData.withdraw_bank_no)
      }
    },
    changeBankNo () {
      const bankNo = this.formData.withdraw_bank_no
      if (!isEmpty(this.findBankByCode)) {
        const findBankByBankName = this.findBankByCode.find(function (o) {
          return o.bank_account_no === bankNo
        })
        this.formData.from_bank_name = findBankByBankName.bank_account_name
      }
    }
  }
}
