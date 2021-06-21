<template>
  <div class="info-personal-form">
    <div class="info-personal-form__user">
      <div class="info-personal-form__avatar">
        <img :src="imageAvatar" alt="avatar">
      </div>
      <div class="overflow-hidden">
        <b>{{ currentUserFullName }}</b>
        <a v-b-modal.modalAvatar href="#" @click.prevent>Thay đổi ảnh đại diện</a>
      </div>
    </div>
    <div class="card">
      <div id="headingOne" class="card-header">
        <button v-b-toggle.collapse-1 class="btn btn-link" type="button">
          <span>THÔNG TIN ĐĂNG NHẬP</span>
          <i />
        </button>
      </div>
      <b-collapse id="collapse-1" visible class="card-body">
        <BaseInput
          ref="userName"
          :input-value="$store.state.currentUser.username"
          required
          label="Tên đăng nhập"
          class="py-1"
          disabled
        />
        <BaseInput
          ref="fullname"
          v-model="formData.fullname"
          :input-value="$store.state.currentUser.fullname"
          required
          label="Tên hiển thị"
          class="pb-1"
          :min-length="6"
          :max-length="30"
        />
        <BaseInput
          ref="password"
          v-model="formData.password"
          type="password"
          name="password"
          label="Mật khẩu mới"
          :max-length="32"
          :min-length="6"
          :limit-input="32"
          class="pb-1"
        />
        <BaseInput
          ref="confirmPassword"
          v-model="formData.confirmPassword"
          type="password"
          name="confirmPassword"
          class="mb-0 pb-1"
          :same-as="formData.password"
          label="Xác nhận mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          :max-length="32"
          :min-length="6"
          :limit-input="32"
        />
      </b-collapse>
    </div>
    <div class="card">
      <div id="headingTwo" class="card-header">
        <button v-b-toggle.collapse-2 class="btn btn-link collapsed" type="button">
          <span>THÔNG TIN LIÊN HỆ</span>
          <i />
        </button>
      </div>
      <b-collapse id="collapse-2" visible class="card-body">
        <BaseInput
          ref="contactName"
          v-model="formData.contactName"
          :input-value="$store.state.currentUser.fullname"
          type="text"
          required
          label="Họ và tên"
          placeholder="Cập nhật họ và tên"
          :min-length="3"
          :max-length="30"
          class="py-1"
        />
        <BaseInput
          ref="email"
          v-model="formData.email"
          type="email"
          label="Email"
          :disabled="!!currentUser.email"
          class="pb-1"
          placeholder="Cập nhật Email"
        />
        <BaseInput
          ref="phone"
          type="phone"
          :input-value="$store.state.currentUser.phone"
          label="Số điện thoại"
          class="mb-0 pb-1"
          disabled
        />
      </b-collapse>
    </div>
    <BaseButton width="100%" class-name="base-button--bg-red" :loading-button="isLoading" @click="submit(true)">CẬP NHẬT THÔNG TIN</BaseButton>
    <ModalAvatar :config="configAvatarModel">
      <template #content>
        <div class="change-avatar">
          <div class="change-avatar__title">
            <h4>THAY ĐỔI ẢNH ĐẠI DIỆN</h4>
            <a href="#" class="change-avatar__cta-close" @click="closeAvatarModel()">
              <img :src="require('~imageRoot/icons/avatar-close-mb.svg')" alt="close">
            </a>
          </div>
          <div class="change-avatar__list">
            <div v-for="i in avatarLength" :key="i" :class="['change-avatar__item', { 'avatar-selected': i === selected }]" @click="selectAvatar(i)">
              <img :src="require(`~imageAsset/layouts/header/login-user/avatar${i}.png`)" alt="avatar">
              <img v-if="i === selected" :src="require('~imageRoot/icons/avatar-selected.svg')" alt="selected">
            </div>
          </div>
          <BaseButton width="100%" class-name="base-button--bg-red" :loading-button="isLoading" @click="doChangeAvatar()">LƯU THAY ĐỔI</BaseButton>
        </div>
      </template>
    </ModalAvatar>
  </div>
</template>

<script>
import infoPersonalMixin from '~/mixins/account/info-personal'
export default {
  mixins: [infoPersonalMixin]
}
</script>

<style lang="scss" scoped src="~scssAsset/account/sp/info-personal-form.scss"></style>
