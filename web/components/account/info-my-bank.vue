<template>
  <div class="info-my-bank">
    <template v-if="userBanks.length">
      <h4>THÔNG TIN TÀI KHOẢN NGÂN HÀNG CỦA TÔI</h4>
      <div class="bank-account">
        <div v-for="item in userBanks" :key="item.bank_account_no" class="bank-account__item">
          <div class="bank-account__wrap">
            <p>
              <span>Tên tài khoản</span>
              <b>{{ item.bank_account_name }}</b>
            </p>
            <img :src="require(`~imageAsset/account/bank-list/${item.bank_code.toLowerCase()}.svg`)" alt="">
          </div>
          <div class="bank-account__wrap">
            <p>
              <span>Số tài khoản</span>
              <b>{{ item.bank_account_no }}</b>
            </p>
            <p class="action">
              <a v-b-modal.modalAccount href="#" class="edit" @click.prevent>Chỉnh Sửa</a>
              <a v-b-modal.modalAccount href="#" class="delete" @click.prevent><img :src="require('~imageRoot/icons/delete.svg')" alt="delete"></a>
            </p>
          </div>
        </div>
        <div v-b-modal.modalAccount class="bank-account__item">
          <a href="#" class="bank-account__link" @click.prevent />
          <img :src="require('~imageRoot/icons/add.svg')" alt="add">
          <p>THÊM TÀI KHOẢN NGÂN HÀNG</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="support-banks">
        <p class="support-banks__icn"><img :src="require('~imageAsset/account/info-my-bank/none-banks.svg')" alt=""></p>
        <h4>BẠN CHƯA CÓ TÀI KHOẢN NGÂN HÀNG CHÍNH CHỦ</h4>
        <div class="support-banks__content">
          <p>Nhằm đảm bảo an toàn khi nạp - rút tiền, quý khách vui lòng sử dụng tài khoản chính chủ để giao dịch</p>
        </div>
        <BaseButton v-b-modal.modalAccount class="support-banks__close" class-name="base-button--bg-red base-button--account">THÊM TÀI KHOẢN NGÂN HÀNG</BaseButton>
      </div>
    </template>
    <ModalAccount :config="config">
      <template #content>
        <div class="support-banks">
          <p class="support-banks__icn"><img :src="require('~imageAsset/account/info-my-bank/add-account-bank.svg')" alt=""></p>
          <h4>CẬP NHẬT THÔNG TIN NGÂN HÀNG</h4>
          <div class="support-banks__content">
            <p>Nhằm đảm bảo tính chính xác của thông tin tài khoản ngân hàng. Quý khách vui lòng liên hệ đội ngũ support để thêm mới bộ tài khoản ngân hàng chính chủ</p>
          </div>
          <div class="support-chanel__list">
            <div v-for="(item, index) in supportItems" :key="index" class="support-chanel__item">
              <SupportItem :item="item" />
            </div>
          </div>
          <BaseButton class="support-banks__close" class-name="base-button--bg-red base-button--account" @click="$root.$emit('bv::hide::modal', config.id)">ĐÓNG</BaseButton>
        </div>
      </template>
    </ModalAccount>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ModalAccount from '~common/modal-account'
import { MODAL } from '~/config/constant'
import SupportItem from '~support/support-item'
import BaseButton from '~common/base-button'

export default {
  components: {
    ModalAccount,
    SupportItem,
    BaseButton
  },
  data () {
    return {
      config: {
        id: MODAL.ACCOUNT,
        class: 'modal--type2 modal--account'
      },
      supportItems: [
        {
          title: 'HOTLINE UK',
          phone: '+44 161 3910 999',
          link: 'tel:+441613910999',
          src: require('~imageAsset/support/support-item/uk.svg'),
          type: 'uk'
        },
        {
          title: 'Zalo',
          phone: '+84 335 33 7777',
          link: 'tel:+84335337777',
          src: require('~imageAsset/support/support-item/zalo.svg'),
          type: 'zalo'
        },
        {
          title: 'HOTLINE VN',
          phone: '+84 335 33 7777',
          link: 'tel:+84335337777',
          src: require('~imageAsset/support/support-item/vn.svg'),
          type: 'vn'
        },
        {
          title: 'Viber',
          phone: '+84 335 33 7777',
          link: 'tel:+84335337777',
          src: require('~imageAsset/support/support-item/viber.svg'),
          type: 'viber'
        }
      ]
    }
  },
  computed: {
    ...mapState(['userBanks'])
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/account/info-my-bank.scss"></style>
