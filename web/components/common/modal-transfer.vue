<template>
  <b-modal
    id="modalTransferWallet"
    ref="modalTransfer"
    modal-class="modal-transfer"
    :hide-header="true"
    :hide-footer="true"
    dialog-class="modal-dialog modal-transfer__dialog"
  >
    <img class="modal-transfer__close" :src="require('~imageRoot/icons/close-modal.svg')" alt="close-modal" @click="closeModal">
    <div class="modal-transfer__content">
      <div class="modal-transfer__body">
        <WalletTransfer />
      </div>
    </div>
  </b-modal>
</template>

<script>
import walletTransferMixin from '~/mixins/account/wallet-transfer'
import WalletTransfer from '~account/wallet-transfer'

export default {
  components: {
    WalletTransfer
  },
  mixins: [walletTransferMixin],
  methods: {
    closeModal () {
      this.$refs.modalTransfer.hide()
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/common/modal-transfer.scss"></style>
