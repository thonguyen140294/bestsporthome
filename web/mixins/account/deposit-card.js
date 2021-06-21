import { mapState } from 'vuex'
import ACCOUNT_API from '~/api/account'
import validateMixin from '~/mixins/validate'
import accountMixin from '~/mixins/account/index'
import { valueCard } from '~/resources/account'

import BaseRadio from '~common/base-radio'
import BaseSelect from '~common/base-select'
import BaseInput from '~common/base-input'
import BaseButton from '~common/base-button'

import WrapperTitle from '~account/wrapper-title'
import CardList from '~account/card-list'

export default {
  mixins: [validateMixin, accountMixin],
  components: {
    BaseRadio,
    BaseSelect,
    BaseInput,
    BaseButton,
    WrapperTitle,
    CardList
  },
  data () {
    return {
      formData: {
        method: 'phone_card',
        card_provider: '',
        card_amount: '',
        card_code: '',
        card_serial: ''
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
      const refs = ['card', 'cardAmount', 'code', 'serial']
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }
      const requestData = {
        ...this.formData,
        card_provider: this.cardSelected.telco
      }
      this.$_accountMixin_submit(requestData, ACCOUNT_API.DEPOSIT_CARD, 'deposit')
    }
  }
}
