import { mapState } from 'vuex'
import ACCOUNT_API from '~/api/account'
import validateMixin from '~/mixins/validate'
import accountMixin from '~/mixins/account/index'
import { valueCard } from '~/resources/account'

import BaseSelect from '~common/base-select'
import BaseInput from '~common/base-input'
import BaseButton from '~common/base-button'

import WrapperTitle from '~account/wrapper-title'
import CardList from '~account/card-list'

export default {
  mixins: [validateMixin, accountMixin],
  components: {
    BaseSelect,
    BaseInput,
    BaseButton,
    WrapperTitle,
    CardList
  },
  data () {
    return {
      formData: {
        to_telcom_code: '',
        card_amount_unit: '',
        card_number: ''
      },
      cardSelected: {
        telco: '',
        value: valueCard
      }
    }
  },
  computed: {
    ...mapState(['telecoms'])
  },
  methods: {
    submit () {
      const refs = ['card', 'cardAmount', 'cardNumber']
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }
      const requestData = {
        ...this.formData,
        to_telcom_code: this.cardSelected.telco
      }
      this.$_accountMixin_submit(requestData, ACCOUNT_API.WITHDRAW_CARD, 'withdraw')
    }
  }
}
