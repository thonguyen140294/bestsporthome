import { MODAL } from '~/config/constant'
import USER_API from '~/api/user'
import validateMixin from '~/mixins/validate'
import BaseInput from '~common/base-input'
import BaseSelect from '~common/base-select'
import BaseButton from '~common/base-button'
import globalMixin from '~/mixins/global-mixin'
import ModalAccount from '~common/modal-account'
import ModalAvatar from '~common/modal-avatar'

export default {
  components: {
    BaseSelect,
    BaseInput,
    BaseButton,
    ModalAccount,
    ModalAvatar
  },
  mixins: [globalMixin, validateMixin],
  data () {
    return {
      formData: {
        email: this.$store.state.currentUser.email || '',
        fullname: this.$store.state.currentUser.fullname || '',
        address: this.$store.state.currentUser.address || '',
        contactName: this.$store.state.currentUser.contactName || '',
        password: '',
        confirmPassword: ''
      },
      emailExist: false,
      config: {
        id: MODAL.ACCOUNT,
        class: 'modal--type2 modal--account'
      },
      configAvatarModel: {
        id: MODAL.AVATAR,
        class: 'modal--type2 modal--account'
      },
      selected: this.$store.state.currentUser.avatar || 1,
      avatarLength: 11
    }
  },
  methods: {
    async checkEmailExist (email, username) {
      const requestData = {
        email,
        username
      }
      const response = await this.$axios.$post(USER_API.CHECK_EMAIL, requestData)
      if (response.status === 'OK') {
        this.emailExist = response.data.exists
      }
    },
    async submit (isMobile) {
      const refs = isMobile ? ['password', 'confirmPassword', 'email', 'fullname', 'contactName'] : ['email', 'fullname', 'contactName']
      const refsValid = this.$_validateMixin_refs(refs)
      if (!refsValid) { return }
      await this.checkEmailExist(this.formData.email, this.$store.state.currentUser.username)
      if (this.emailExist) {
        this.$showError({
          title: 'LỖI',
          error: 'Email đã tồn tại. Vui lòng chọn email khác',
          icon: 'error',
          dangerMode: true,
          button: false
        })
        return
      }

      const email = this.currentUser.email ? this.currentUser.email : this.formData.email

      const requestData = {
        email,
        fullname: this.formData.fullname,
        contactName: this.formData.contactName
      }
      try {
        this.$_globalMixin_loading()
        const response = await this.$axios.$put(USER_API.UPDATE_PROFILE, requestData)
        if (response && response.status === 'OK') {
          this.$store.commit('currentUser', requestData)
          this.$swal({
            title: 'CẬP NHẬT THÀNH CÔNG',
            text: 'Cập nhật thông tin cá nhân thành công',
            icon: 'success',
            timer: 1000,
            button: false
          })
        } else {
          this.$showError({
            title: 'LỖI',
            error: response,
            icon: 'error',
            button: 'ĐỒNG Ý'
          })
        }
        this.$_globalMixin_load()
      } catch (error) {
        this.$_globalMixin_load()
      }

      if (isMobile && this.formData.password) {
        this.doChangePassword()
      }
    },
    async doChangePassword () {
      try {
        const refs = ['password', 'confirmPassword']
        const refsValid = this.$_validateMixin_refs(refs)
        if (!refsValid) { return }
        this.$_globalMixin_loading()
        const requestData = {
          password: this.formData.password
        }
        const response = await this.$axios.$put(USER_API.UPDATE_PASSWORD, requestData)
        if (response && response.status === 'OK') {
          this.formData.password = ''
          this.formData.confirmPassword = ''
          this.$root.$emit('bv::hide::modal', this.config.id)
          this.$swal({
            title: 'CẬP NHẬT THÀNH CÔNG',
            text: 'Thay đổi mật khẩu thành công',
            icon: 'success',
            timer: 1000,
            button: false
          })
        } else {
          this.$showError({
            title: 'LỖI',
            error: response.message,
            icon: 'error',
            button: 'ĐỒNG Ý'
          })
        }
        this.$_globalMixin_load()
      } catch (error) {
        this.$_globalMixin_load()
      }
    }
	}
}
