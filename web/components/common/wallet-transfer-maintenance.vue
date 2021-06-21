<template>
  <b-modal
    id="wallet-maintenance-modal"
    v-model="show"
    modal-class="maintenance"
    :hide-header="true"
    :hide-footer="true"
    @hide="onClose"
  >
    <p class="close" @click="onClose" />
    <div class="modal-maintenance-content">
      <div class="modal-body">
        <p class="img-wallet">
          <img :src="require('~imageRoot/icons/icon-transfer.svg')" alt="">
        </p>
        <p class="modal-maintenance-content__title pc-title mb-1">
          Không thể thực hiện chức năng do bảo trì
        </p>
        <p class="modal-maintenance-content__title mb-title mb-1">
          BẢO TRÌ TÀI KHOẢN VÍ CHÍNH
        </p>
        <div class="modal-maintenance-content__des">
          <div class="main-wallet">
            <div class="wallet-info">
              <span class="main-wallet__icon">
                <img class="main-wallet__icon-size" :src="require('~imageRoot/icons/money-sum.svg')" alt="">
              </span>
              <p class="main-wallet__title">
                Tổng số dư:
                <span class="maintenance-highlight">Đang bảo trì</span>
              </p>
            </div>
          </div>

          <div class="main-wallet wallet-common">
            <p class="main-wallet__info">Ví Chính: <span class="maintenance-highlight maintenance-status">Đang bảo trì</span></p>
            <p class="sub-count">Ví Phụ: <span class="maintenance-status sub-wallet">{{ globalSubBalance || 0 | formatAmountUnit(1) }} Đ</span></p>
          </div>

          <div class="main-wallet">
            <div class="sub-info">
              <span class="main-wallet__icon">
                <img class="main-wallet__icon-size" :src="require('~imageRoot/icons/notic.svg')" alt="">
              </span>
              <p class="main-wallet__title">
                Các sản phẩm game <span class="sub-wallet">Ví Phụ</span> vẫn hoạt động bình thường
              </p>
            </div>
          </div>
        </div>
        <div class="modal-maintenance-content__shadow-line"></div>
        <div class="modal-maintenance-content__wrap-btn">
          <BaseButton class="btn btn-history" width="100%" class-name="base-button--transfer base-button--bg-red" @click="onClose()">ĐÓNG</BaseButton>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import globalMixin from '~/mixins/global-mixin'
import maintenanceMixin from '~/mixins/maintenance'
import BaseButton from '~common/base-button'

export default {
  components: {
    BaseButton
  },
  mixins: [globalMixin, maintenanceMixin],
  computed: {
    show: {
      get () {
        return this.$store.state.maintenance.showWalletMaintenance
      },
      set (isShowWalletMaintenance) {
        this.$store.commit('maintenance/setShowWalletMaintenance', isShowWalletMaintenance)
      }
    }
  },
  methods: {
    onClose () {
      this.$store.commit('maintenance/setShowWalletMaintenance', false)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/common/maintenance.scss"></style>
