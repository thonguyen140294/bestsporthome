<template>
  <div class="withdraw-card-form">
    <WrapperTitle title="1. CHỌN NHÀ MẠNG">
      <CardList ref="card" v-model="cardSelected" :telecoms="telecoms" />
    </WrapperTitle>
    <WrapperTitle title="2. TẠO PHIẾU RÚT">
      <BaseSelect
        ref="cardAmount"
        v-model="formData.card_amount_unit"
        name="cardAmount"
        required
        label="Mệnh giá thẻ cào"
        placeholder="- Chọn mệnh giá thẻ cào -"
        :items="cardSelected.value"
        text-field="text"
        value-field="id"
        class-name="base-select--account"
      />
      <BaseInput
        ref="cardNumber"
        v-model="formData.card_number"
        type="tel"
        label="Số lượng thẻ"
        class-name="base-input--account"
        required
        :min-value="1"
        :limit-input="3"
        :max-length="3"
      />
    </WrapperTitle>
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
import withdrawCardMixin from '~/mixins/account/withdraw-card'

export default {
  mixins: [withdrawCardMixin]
}
</script>

<style lang="scss" scoped src=""></style>
