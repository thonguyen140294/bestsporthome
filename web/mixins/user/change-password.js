import USER_API from '~/api/user'
import globalMixin from '~/mixins/global-mixin'
import modalMixin from '~/mixins/user/modal'

export default {
  mixins: [globalMixin, modalMixin],
  methods: {
    async $_changePasswordMixin_change (token) {
      this.$_globalMixin_loading()
      try {
        await this.$axios.$put(USER_API.UPDATE_PASSWORD, { ...this.formData }, { headers: { token } })
        this.$_globalMixin_load()
        this.$showError({
          title: 'CẬP NHẬT THÀNH CÔNG',
          error: { message: 'Mật khẩu đã được cập nhật thành công' },
          icon: 'success',
          url: '/'
        })
      } catch (error) {
        this.$showError({ error: { message: 'KÍCH HOẠT KHÔI PHỤC MẬT KHẨU ĐÃ HẾT HẠN. VUI LÒNG THỬ LẠI' } })
        this.$_globalMixin_load()
      }
    }
  }
}
