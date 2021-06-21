import globalMixin from '~/mixins/global-mixin'
import validateMixin from '~/mixins/validate'
import USER_API from '~/api/user'

export default {
  mixins: [globalMixin, validateMixin],
  data () {
    return {
      formData: {
        category: '',
        email: '',
        name: '',
        phoneNumber: '',
        content: ''
      },
      itemCategory: [
        'Nạp/Rút tiền',
        'Khuyến mãi',
        'Hỗ trợ kĩ thuật',
        'Góp ý / khiếu nại'
      ]
    }
  },
  methods: {
    resetFormContact () {
      this.formData = {
        category: '',
        email: '',
        name: '',
        phoneNumber: '',
        content: ''
      }
    },
    async submit () {
      const refs = ['category', 'email', 'name', 'phoneNumber', 'content']
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }
      this.$_globalMixin_loading()
      try {
        const response = await this.$axios.post(USER_API.SEND_CONTACT_EMAIL, { ...this.formData })
        if (response && response.data.status === 'OK') {
          this.resetFormContact()
          this.$_validateMixin_reset(refs)
          this.$swal({
            title: 'THÀNH CÔNG',
            text: 'Gửi email thành công',
            icon: 'success',
            timer: 1000,
            button: false
          })
        } else {
          this.$swal({
            title: 'LỖI',
            text: response.data.message,
            icon: 'error',
            dangerMode: true,
            button: 'ĐỒNG Ý'
          })
        }
        this.$_globalMixin_load()
      } catch (error) {
        this.$showError({ error })
        this.$_globalMixin_load()
      }
    }
  }
}
