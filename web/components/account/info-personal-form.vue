<template>
  <div class="info-personal-form">
    <div class="info-personal-form__content">
      <div class="info-personal-form__item">
        <div class="info-personal-form__wrap">
          <div class="info-personal-form__user">
            <div class="info-personal-form__avatar">
              <img :src="imageAvatar" alt="avatar">
            </div>
            <div class="overflow-hidden">
              <b>{{ currentUserFullName }}</b>
              <a v-b-modal.modalAvatar href="#" @click.prevent>Thay đổi ảnh đại diện</a>
            </div>
          </div>
          <h4>THÔNG TIN ĐĂNG NHẬP</h4>
          <BaseInput
            ref="userName"
            :input-value="$store.state.currentUser.username"
            required
            label="Tên đăng nhập"
            class="mb-1"
            disabled
          />
          <BaseInput
            ref="fullname"
            v-model="formData.fullname"
            :input-value="$store.state.currentUser.fullname"
            required
            label="Tên hiển thị"
            class="mb-0"
            :min-length="6"
            :max-length="30"
          />
          <div class="info-link">
            <a v-b-modal.modalAccount href="#" @click.prevent>Thay đổi mật khẩu</a>
          </div>
        </div>
        <div class="info-personal-form__wrap">
          <h4>THÔNG TIN LIÊN HỆ</h4>
          <BaseInput
            ref="contactName"
            v-model="formData.contactName"
            :input-value="$store.state.currentUser.contactName"
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
            placeholder="Cập nhật Email"
            class="py-1"
          />
          <BaseInput
            ref="phone"
            type="phone"
            :input-value="$store.state.currentUser.phone"
            label="Số điện thoại"
            class="mb-0 py-1"
            disabled
          />
        </div>
      </div>
      <div class="info-personal-form__item">
        <div class="info-personal-form__wrap">
          <img class="w-100" :src="require('~imageAsset/account/info-personal-form/info-banner.png')" alt="info-banner">
        </div>
      </div>
    </div>
    <div class="info-personal-form__action">
      <BaseButton
        width="100%"
        class-name="base-button--bg-red base-button--account"
        :loading-button="isLoading"
        @click="submit()"
      >
        CẬP NHẬT THÔNG TIN
      </BaseButton>
    </div>
    <ModalAccount :config="config">
      <template #content>
        <div class="change-password">
          <h4>Thay đổi mật khẩu</h4>
          <BaseInput
            ref="password"
            v-model="formData.password"
            type="password"
            name="password"
            required
            class="mb-2rem"
            label="Mật khẩu mới"
            :max-length="32"
            :min-length="6"
            :limit-input="32"
          />
          <BaseInput
            ref="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            name="confirmPassword"
            class="mb-2rem"
            :same-as="formData.password"
            label="Xác nhận mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            :max-length="32"
            :min-length="6"
            :limit-input="32"
          />
          <BaseButton width="100%" class-name="base-button--bg-red" :loading-button="isLoading" @click="doChangePassword()">Xác nhận</BaseButton>
        </div>
      </template>
    </ModalAccount>
    <ModalAvatar :config="configAvatarModel">
      <template #content>
        <p class="close" @click="closeAvatarModel()" />
        <div class="change-avatar">
          <h4>THAY ĐỔI ẢNH ĐẠI DIỆN</h4>
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

<style lang="scss" scoped src="~scssAsset/account/info-personal-form.scss"></style>
