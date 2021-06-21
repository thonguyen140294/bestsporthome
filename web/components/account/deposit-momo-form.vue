<template>
  <div class="deposit-momo-form">
    <WrapperTitle title="1. CHỌN MOMO MU9 ĐỂ CHUYỂN KHOẢN">
      <MomoList ref="bankCode" v-model="accountSelected" :momos="momos" />
      <BankInfo :bank="accountSelected" />
    </WrapperTitle>
    <WrapperTitle title="2. TẠO PHIẾU NẠP">
      <BaseInput
        ref="fromBankNo"
        v-model="formData.from_bank_no"
        type="tel"
        required
        label="Số điện thoại người gửi"
        class="w-60per"
        :min-length="10"
        :max-length="11"
        :limit-input="11"
      />
      <div class="form-wrap">
        <BaseInput
          ref="amount"
          v-model="formData.amount_deposit_mask"
          type="tel"
          label="Số tiền nạp"
          placeholder="Tối thiểu 50 Đ, tối đa 20.000 Đ"
          class="w-60per"
          required
          thousands-separator-symbol=","
          to-vnd
          :limit-input="6"
          :min-value="minInputDeposit"
          :error-min-value="errorMinValueDeposit"
          :max-value="20000"
          error-max-value="Số tiền nạp tối đa là 20,000 Đ"
        />
        <p class="form-wrap__note">(1 Đ = 1000 VNĐ)</p>
      </div>
      <BaseInput
        ref="bankTrancode"
        v-model="formData.bank_trancode"
        type="tel"
        required
        label="Mã giao dịch"
        :max-length="20"
        :limit-input="20"
        class="w-60per mb-0"
      />
    </WrapperTitle>
    <WrapperTitle v-if="filterPackageVisible.length && !isWelcomeType" title="3. CHỌN GÓI KHUYẾN MÃI">
      <PromotionPackage v-model="formData.package_id" :packages="filterPackageVisible" />
      <div v-if="isShowBankNote(formData.package_id)" class="mt-2point5rem">
        <div class="bank-note w-60per">
          <p>Nhằm ngăn chặn các hành vi có mục đích trục lợi khuyến mãi, Quý khách vui lòng cung cấp trước thông tin tài khoản rút tiền. Tài khoản này sẽ được sử dụng cho việc rút tiền sau này.</p>
        </div>
        <BaseSelect
          ref="withdrawBankCode"
          v-model="formData.withdraw_bank_code"
          name="withdrawBankCode"
          label="Chọn ngân hàng"
          required
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
          class-name="base-input--account"
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
import depositMomoMixin from '~/mixins/account/deposit-momo'
export default {
  mixins: [depositMomoMixin]
}
</script>

<style lang="scss" scoped src="~scssAsset/account/deposit-momo-form.scss"></style>
