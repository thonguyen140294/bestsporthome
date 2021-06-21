<template>
  <div class="deposit-card-form">
    <WrapperTitle title="1. CHỌN NHÀ MẠNG">
      <CardList ref="card" v-model="cardSelected" :telecoms="telecoms" />
    </WrapperTitle>
    <WrapperTitle title="2. TẠO PHIẾU NẠP">
      <BaseSelect
        ref="cardAmount"
        v-model="formData.card_amount"
        name="cardAmount"
        required
        label="Mệnh giá thẻ cào"
        placeholder="- Chọn mệnh giá thẻ cào -"
        :items="cardSelected.value"
        text-field="text"
        value-field="id"
        class="w-60per"
      />
      <BaseInput
        ref="code"
        v-model="formData.card_code"
        type="tel"
        label="Mã thẻ cào"
        class="w-60per"
        required
        :limit-input="20"
        :max-length="15"
      />
      <BaseInput
        ref="serial"
        v-model="formData.card_serial"
        type="tel"
        label="Số series thẻ cào"
        class="w-60per"
        required
        :limit-input="20"
        :max-length="15"
      />
      <p class="deposit-card-form__note font-italic">
        Lưu ý:
        <br>- Vui lòng chọn đúng mệnh giá và nhà mạng,
        nếu nhập sai chúng tôi không chịu trách nhiệm
        <br>- Phí gạch thẻ chỉ từ 32% rẻ nhất thị trường
        (Viettel: 32%, Vinaphone: 33%, Mobiphone: 34%)
        <br>- Khuyến mãi 110%, 50%, 30% và 20% không áp dụng khi nạp thẻ cào.
      </p>
    </WrapperTitle>
    <BaseButton
      class="mb-1"
      :disabled="isLoading"
      width="100%"
      class-name="base-button--bg-red base-button--account"
      :is-loading="isLoading"
      @click="submit()"
    >
      TẠO PHIẾU NẠP
    </BaseButton>
  </div>
</template>

<script>
import depositCardMixin from '~/mixins/account/deposit-card'

export default {
  mixins: [depositCardMixin]
}

</script>

<style lang="scss" scoped src="~scssAsset/account/deposit-card-form.scss"></style>
