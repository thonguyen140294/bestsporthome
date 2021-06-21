<template>
  <div class="deposit-bank-form">
    <WrapperTitle title="1. PHƯƠNG PHÁP NẠP">
      <BaseRadio v-model="formData.method" :items="methodOptions" name="method" />
    </WrapperTitle>
    <WrapperTitle title="2. CHỌN NGÂN HÀNG MU9 ĐỂ CHUYỂN KHOẢN">
      <BankList ref="bankCode" v-model="bankSelected" :banks="banks" @change="handleSelectBank" />
      <BankInfo v-if="bankAccount" :bank="bankAccount" />
    </WrapperTitle>
    <WrapperTitle title="3. TẠO PHIẾU NẠP">
      <BaseInput
        v-if="!isSelectName"
        ref="fromBankName"
        v-model="formData.from_bank_name"
        required
        :disabled="isDisableSender"
        label="Tên người gửi"
        class="w-60per"
      />
      <BaseSelect
        v-else
        ref="selectBankCode"
        v-model="formData.from_bank_name"
        required
        label="Tên người gửi"
        :items="selectBankAccountName"
        text-field="bank_account_name"
        value-field="bank_account_name"
        class="w-60per"
        no-label
        @change="changeBankName"
      />
      <div class="form-wrap">
        <BaseInput
          ref="amount"
          v-model="formData.amount_deposit_mask"
          type="tel"
          label="Số tiền nạp"
          placeholder="Tối thiểu 50 Đ, tối đa 1.000.000 Đ"
          class="w-60per"
          :class="{ 'mb-0': !bankTrancodePlaceholder }"
          required
          to-vnd
          thousands-separator-symbol=","
          :limit-input="9"
          :min-value="minInputDeposit"
          :error-min-value="errorMinValueDeposit"
          :max-value="1000000"
          error-max-value="Số tiền nạp tối đa là 1,000,000 Đ"
        />
        <p class="form-wrap__note">(1 Đ = 1000 VNĐ)</p>
      </div>
      <div v-if="bankTrancodePlaceholder">
        <BaseInput
          v-show="isInputTelType"
          ref="bankTrancodeTel"
          type="tel"
          v-model="formData.bank_trancode"
          required
          :label="bankTrancodePlaceholder.replace('Nhập ', '')"
          :disabled="isDisableTransCode"
          class="w-60per mb-0"
          :placeholder="bankTrancodePlaceholder"
        />
        <BaseInput
          v-show="!isInputTelType"
          ref="bankTrancodeText"
          type="text"
          v-model="formData.bank_trancode"
          required
          :label="bankTrancodePlaceholder.replace('Nhập ', '')"
          :disabled="isDisableTransCode"
          class="w-60per mb-0"
          :placeholder="bankTrancodePlaceholder"
        />
      </div>
    </WrapperTitle>
    <WrapperTitle v-if="filterPackageVisible.length && !isWelcomeType" title="4. CHỌN GÓI KHUYẾN MÃI">
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
          v-if="!isSelectBankName"
          ref="fromBankNameWithdraw"
          v-model="formData.from_bank_name"
          required
          label="Tên chủ tài khoản"
          :disabled="disabledPromoBankName"
          laceholder="Nhập tên tài khoản ngân hàng"
          class="w-60per"
        />
        <BaseSelect
          v-else
          ref="fromBankNameWithdraw"
          v-model="formData.from_bank_name"
          required
          label="Tên chủ tài khoản"
          :items="selectBankAccountName"
          text-field="bank_account_name"
          value-field="bank_account_name"
          class="w-60per"
          no-label
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
          class="w-60per mb-0"
        />
        <BaseSelect
          v-else
          ref="fromBankNameWithdraw"
          v-model="formData.withdraw_bank_no"
          required
          label="Số tài khoản rút tiền"
          :items="findBankByCode"
          text-field="bank_account_no"
          value-field="bank_account_no"
          class="w-60per"
          no-label
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
import promotionMixin from '~/mixins/promotion'
export default {
  mixins: [depositBankMixin, promotionMixin],
  watch: {
    'formData.method': {
      handler (value) {
        if (value) {
          this.$router.replace({ query: { tab: 'deposit', type: value } })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/account/deposit-bank-form.scss"></style>
