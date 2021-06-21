<template>
  <div class="deposit-bank-form">
    <WrapperTitle title="1. CHỌN NGÂN HÀNG MU9 ĐỂ CHUYỂN KHOẢN">
      <BankList ref="bankCode" v-model="bankSelected" :banks="banks" @change="handleSelectBank" />
      <BankInfo v-if="bankAccount" :bank="bankAccount" />
    </WrapperTitle>
    <WrapperTitle title="2. TẠO PHIẾU NẠP">
      <BaseInput
        v-if="!isSelectName"
        ref="fromBankName"
        v-model="formData.from_bank_name"
        required
        :disabled="isDisableSender"
        label="Tên người gửi"
      />
      <BaseSelect
        v-else
        ref="selectBankCode"
        v-model="formData.from_bank_name"
        required
        no-label
        label="Tên người gửi"
        :items="selectBankAccountName"
        text-field="bank_account_name"
        value-field="bank_account_name"
        @change="changeBankName"
      />
      <BaseInput
        ref="amount"
        v-model="formData.amount_deposit_mask"
        type="tel"
        label="Số tiền nạp"
        placeholder="Tối thiểu 50 Đ, tối đa 1.000.000 Đ"
        class="mb-0point5rem"
        required
        thousands-separator-symbol=","
        to-vnd
        :limit-input="9"
        :min-value="minInputDeposit"
        :error-min-value="errorMinValueDeposit"
        :max-value="1000000"
        error-max-value="Số tiền nạp tối đa là 1,000,000 Đ"
      />
      <p class="mb-1point5rem text-color-838A92">(1 Đ = 1000 VNĐ)</p>
      <div v-if="bankTrancodePlaceholder">
        <BaseInput
          v-show="isInputTelType"
          type="tel"
          ref="bankTrancodeTel"
          v-model="formData.bank_trancode"
          required
          :disabled="isDisableTransCode"
          :label="bankTrancodePlaceholder.replace('Nhập ', '')"
          class="mb-0"
          :placeholder="bankTrancodePlaceholder"
        />
        <BaseInput
          v-show="!isInputTelType"
          type="text"
          ref="bankTrancodeText"
          v-model="formData.bank_trancode"
          required
          :disabled="isDisableTransCode"
          :label="bankTrancodePlaceholder.replace('Nhập ', '')"
          class="mb-0"
          :placeholder="bankTrancodePlaceholder"
        />
      </div>
    </WrapperTitle>
    <WrapperTitle v-if="filterPackageVisible.length && !isWelcomeType" title="3. CHỌN GÓI KHUYẾN MÃI">
      <PromotionPackage v-model="formData.package_id" :packages="filterPackageVisible" />
      <div v-if="isShowBankNote(formData.package_id)" class="mt-1point5rem">
        <div class="bank-note">
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
        />
        <BaseInput
          v-if="!isSelectBankName"
          ref="fromBankNameWithdraw"
          v-model="formData.from_bank_name"
          required
          label="Tên chủ tài khoản"
          laceholder="Nhập tên tài khoản ngân hàng"
          :disabled="disabledPromoBankName"
        />
        <BaseSelect
          v-else
          ref="fromBankNameWithdraw"
          v-model="formData.from_bank_name"
          required
          no-label
          label="Tên chủ tài khoản"
          :items="selectBankAccountName"
          text-field="bank_account_name"
          value-field="bank_account_name"
          @change="changeBankName"
        />
        <BaseInput
          v-if="!isSelectBankNo"
          ref="withdrawBankNo"
          v-model="formData.withdraw_bank_no"
          type="tel"
          required
          :disabled="disabledPromoBankNo"
          label="Số tài khoản rút tiền"
          class="mb-0"
        />
        <BaseSelect
          v-else
          ref="fromBankNameWithdraw"
          v-model="formData.withdraw_bank_no"
          required
          no-label
          label="Số tài khoản rút tiền"
          :items="findBankByCode"
          text-field="bank_account_no"
          value-field="bank_account_no"
          @change="changeBankNo"
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
import depositBankMixin from '~/mixins/account/deposit-bank'
export default {
  mixins: [depositBankMixin]
}
</script>

<style lang="scss" scoped src="~scssAsset/account/deposit-bank-form.scss"></style>
