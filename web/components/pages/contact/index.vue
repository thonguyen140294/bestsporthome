<template>
  <div class="contact">
    <div class="container">
      <div class="row">
        <div class="contact__left col-md-4 col-12">
          <div class="contact__inner">
            <h3 class="contact__title">Bộ phận CSKH</h3>
            <p class="contact__desc">
              Quý Khách có thắc mắc cần giải đáp hay muốn góp ý với chúng tôi. Đừng ngần ngại,
              hãy liên lạc ngay với chúng tôi bất kỳ lúc nào.
            </p>
          </div>
        </div>
        <div class="col-lg-8 col-12">
          <div class="contact__form">
            <div class="row">
              <div class="col-md-6 col-sm-6 col-12">
                <BaseSelect
                  ref="category"
                  v-model="formData.category"
                  required
                  label="Danh mục thắc mắc"
                  placeholder="Chọn danh mục"
                  :items="itemCategory"
                />
              </div>
              <div class="col-md-6 col-sm-6 col-12">
                <BaseInput
                  ref="email"
                  v-model="formData.email"
                  type="email"
                  label="Email"
                  required
                />
              </div>
              <div class="col-md-6 col-sm-6 col-12">
                <BaseInput
                  ref="name"
                  v-model="formData.name"
                  type="text"
                  label="Họ và tên"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>
              <div class="col-md-6 col-sm-6 col-12">
                <BaseInput
                  ref="phoneNumber"
                  v-model="formData.phoneNumber"
                  type="tel"
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  :max-length="11"
                  :min-length="10"
                  :limit-input="11"
                  required
                />
              </div>
              <div class="col-12">
                <BaseInput
                  ref="content"
                  v-model="formData.content"
                  type="textarea"
                  rows="8"
                  label="Nội dung thắc mắc"
                  placeholder="Nhập nội dung"
                  required
                />
              </div>
              <div class="col-12">
                <BaseButton
                  width="100%"
                  class="mb-1"
                  :loading-button="isLoading"
                  class-name="base-button--bg-red base-button--account"
                  @click="submit"
                >
                  GỬI TIN NHẮN
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '~common/base-input'
import BaseButton from '~common/base-button'
import BaseSelect from '~common/base-select'
import contactMixin from '~/mixins/contact'

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseSelect
  },
  mixins: [contactMixin]
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/contact/index.scss"></style>
