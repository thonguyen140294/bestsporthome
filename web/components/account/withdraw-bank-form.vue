<template>
  <div class="withdraw-bank-form">
    <template v-if="userBanks && userBanks.length">
      <WrapperTitle title="1. TẠO PHIẾU RÚT">
        <BankCardList ref="bankCode" v-model="bankSelected" :banks="userBanks" class="mb-1point5rem" />
        <div v-if="withoutBankAccountNo" class="form-wrap">
          <BaseInput
            ref="toBankNo"
            type="tel"
            v-model="formData.to_bank_no"
            required
            label="Số tài khoản"
            class="w-60per"
          />
        </div>
        <div class="form-wrap">
          <BaseInput
            ref="amount"
            v-model="formData.amount_withdraw_mask"
            type="tel"
            label="Số tiền rút"
            placeholder="Tối thiểu 100 Đ, tối đa 1.000.000 Đ"
            class="w-60per mb-0"
            required
            thousands-separator-symbol=","
            to-vnd
            :limit-input="9"
            :min-value="100"
            error-min-value="Số tiền rút tối thiểu là 100 Đ"
            :max-value="1000000"
            error-max-value="Số tiền rút tối đa là 1,000,000 Đ"
          />
          <p class="form-wrap__note">(1 Đ = 1000 VNĐ)</p>
        </div>
      </WrapperTitle>
    </template>
    <template v-else>
      <WrapperTitle title="1. CHỌN NGÂN HÀNG ĐỂ NHẬN TIỀN">
        <BankList ref="bankCode" v-model="bankSelected" :banks="banks" />
      </WrapperTitle>
      <WrapperTitle title="2. TẠO PHIẾU RÚT">
        <div class="form-wrap">
          <BaseInput
            ref="amount"
            v-model="formData.amount_withdraw_mask"
            type="tel"
            label="Số tiền rút"
            placeholder="Tối thiểu 100 Đ, tối đa 1.000.000 Đ"
            class="w-60per"
            required
            thousands-separator-symbol=","
            to-vnd
            :limit-input="9"
            :min-value="100"
            error-min-value="Số tiền rút tối thiểu là 100 Đ"
            :max-value="1000000"
            error-max-value="Số tiền rút tối đa là 1,000,000 Đ"
          />
          <p class="form-wrap__note">(1 Đ = 1000 VNĐ)</p>
        </div>
        <BaseInput
          ref="toBankNo"
          type="tel"
          v-model="formData.to_bank_no"
          required
          label="Số tài khoản"
          class="w-60per"
        />
        <BaseInput
          ref="toBankNanme"
          v-model="formData.to_bank_name"
          required
          label="Họ và tên người nhận"
          class="w-60per mb-0"
        />
      </WrapperTitle>
    </template>
    <BaseButton
      class="mb-1"
      :disabled="isLoading"
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

<style lang="scss" scoped src="~scssAsset/account/withdraw-bank-form.scss"></style>
