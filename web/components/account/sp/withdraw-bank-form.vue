<template>
  <div class="withdraw-bank-form">
    <template v-if="!userBanks.length">
      <WrapperTitle title="1. CHỌN NGÂN HÀNG ĐỂ NHẬN TIỀN">
        <BankList ref="bankCode" v-model="bankSelected" :banks="banks" />
      </WrapperTitle>
      <WrapperTitle title="2. TẠO PHIẾU RÚT">
        <BaseInput
          ref="amount"
          v-model="formData.amount_withdraw_mask"
          type="tel"
          label="Số tiền rút"
          placeholder="Tối thiểu 100 Đ, tối đa 1.000.000 Đ"
          class-name="base-input--account"
          required
          thousands-separator-symbol=","
          to-vnd
          :limit-input="9"
          :min-value="100"
          error-min-value="Số tiền rút tối thiểu là 100 Đ"
          :max-value="1000000"
          error-max-value="Số tiền rút tối đa là 1,000,000 Đ"
        />
        <p class="mb-1point5rem text-color-838A92">(1 Đ = 1000 VNĐ)</p>
        <BaseInput
          ref="toBankNo"
          type="tel"
          v-model="formData.to_bank_no"
          required
          label="Số tài khoản"
          class-name="base-input--account"
        />
        <BaseInput
          ref="toBankNanme"
          v-model="formData.to_bank_name"
          required
          label="Họ và tên người nhận"
          class="mb-0"
          class-name="base-input--account"
        />
      </WrapperTitle>
    </template>
    <template v-else>
      <WrapperTitle title="1. TẠO PHIẾU RÚT">
        <BankCardList ref="bankCode" v-model="bankSelected" :banks="userBanks" class="mb-1point5rem" />
        <div v-if="withoutBankAccountNo" class="form-wrap">
          <BaseInput
            ref="toBankNo"
            type="tel"
            v-model="formData.to_bank_no"
            required
            label="Số tài khoản"
          />
        </div>
        <BaseInput
          ref="amount"
          v-model="formData.amount_withdraw_mask"
          type="tel"
          label="Số tiền rút"
          placeholder="Tối thiểu 100 Đ, tối đa 1.000.000 Đ"
          class-name="base-input--account"
          required
          thousands-separator-symbol=","
          to-vnd
          :limit-input="9"
          :min-value="100"
          error-min-value="Số tiền rút tối thiểu là 100 Đ"
          :max-value="1000000"
          error-max-value="Số tiền rút tối đa là 1,000,000 Đ"
        />
        <p class="mb-1point5rem text-color-838A92">(1 Đ = 1000 VNĐ)</p>
      </WrapperTitle>
    </template>
    <BaseButton
      :disabled="isLoading"
      class="mb-1"
      width="100%"
      class-name="base-button--bg-red base-button--account"
      :loading-button="isLoading"
      @click="submit()"
    >
      TẠO PHIẾU RÚT
    </BaseButton>
  </div>
</template>

<script>
import withdrawBankMixin from '~/mixins/account/withdraw-bank'

export default {
  mixins: [withdrawBankMixin]
}
</script>

<style lang="scss" scoped src=""></style>
