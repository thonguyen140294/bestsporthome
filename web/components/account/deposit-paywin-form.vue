<template>
  <div class="deposit-paywin-form">
    <WrapperTitle title="1. CHỌN NGÂN HÀNG MU9 ĐỂ CHUYỂN KHOẢN">
      <BankList ref="bankCode" v-model="bankSelected" :banks="banks" />
    </WrapperTitle>
    <WrapperTitle title="2. TẠO PHIẾU NẠP">
      <div class="form-wrap">
        <BaseInput
          ref="amount"
          v-model="formData.amount_deposit_mask"
          type="tel"
          label="Số tiền nạp"
          placeholder="Tối thiểu 50 Đ, tối đa 1.000.000 Đ"
          class="w-60per mb-0"
          class-name="base-input--account"
          required
          thousands-separator-symbol=","
          to-vnd
          :limit-input="9"
          :min-value="minInputDeposit"
          :error-min-value="errorMinValueDeposit"
          :max-value="1000000"
          error-max-value="Số tiền nạp tối đa là 1,000,000 Đ"
        />
        <p class="form-wrap__note">(1 Đ = 1000 VNĐ)</p>
      </div>
    </WrapperTitle>
    <WrapperTitle v-if="filterPackageVisible.length && !isWelcomeType" title="3. CHỌN GÓI KHUYẾN MÃI">
      <PromotionPackage v-model="formData.package_id" :packages="filterPackageVisible" />
      <div v-if="isShowBankNote(formData.package_id)" class="mt-2point5rem">
        <div class="bank-note w-60per">
          <p>Nhằm ngăn chặn các hành vi có mục đích trục lợi khuyến mãi, Quý khách vui lòng cung cấp trước thông tin tài khoản rút tiền. Tài khoản này sẽ được sử dụng cho việc rút tiền sau này.</p>
        </div>
        <BaseSelect
          name="withdrawBankCode"
          :input-value="bankSelected.bank_code"
          disabled
          label="Chọn ngân hàng"
          placeholder="- Click để chọn ngân hàng -"
          :items="banks"
          text-field="bank_name"
          value-field="bank_code"
          class="w-60per"
        />
        <BaseInput
          ref="fromBankNameWithdraw"
          v-model="formData.from_bank_name"
          required
          label="Tên chủ tài khoản"
          laceholder="Nhập tên tài khoản ngân hàng"
          class="w-60per"
        />
        <BaseInput
          ref="withdrawBankNo"
          v-model="formData.withdraw_bank_no"
          type="tel"
          required
          label="Số tài khoản rút tiền"
          class="w-60per mb-0"
        />
      </div>
    </WrapperTitle>
    <BaseButton
      class="mb-1"
      :disabled="isLoading"
      width="100%"
      class-name="base-button--bg-red base-button--account"
      :loading-button="isLoading"
      @click="submit()"
    >
      TẠO PHIẾU NẠP
    </BaseButton>
  </div>
</template>

<script>
import depositPaywinMixin from '~/mixins/account/deposit-paywin'

export default {
  mixins: [depositPaywinMixin]
}
</script>

<style lang="scss" scoped src="~scssAsset/account/deposit-paywin-form.scss"></style>
