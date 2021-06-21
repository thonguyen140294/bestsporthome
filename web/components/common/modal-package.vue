<template>
  <b-modal
    id="modalPackage"
    ref="modalPackage"
    modal-class="modal-package"
    hide-header
    hide-footer
    ok-only
    centered
    dialog-class="modal-dialog modal-package__dialog"
  >
    <p class="close" @click="$_modalMixin_closeModal('modalPackage')">
      <img :src="require('~imageAsset/user/close-login.svg')" alt="">
    </p>
    <p class="modal-package__title">{{ packageItem.title }}</p>
    <div class="modal-package__body">
      <div class="modal-package__content">
        <div v-for="(item, index) in packageItem.content" :key="index" class="content-item">
          <i />
          <p class="content-detail">{{ item }}</p>
        </div>
      </div>
      <div class="modal-package__desc">
        <div v-if="currentPackage !== 'bonus'">
          <span class="package-highlight"> Ví dụ: </span>{{ packageItem.example }}
          <p class="package-highlight">{{ packageItem.highlight }}</p>
        </div>
        <div v-else>
          <p class="package-highlight">Các bước để nhận khuyến mãi:</p>
          <div class="modal-package__steps">
            <p v-for="(item, index) in packageItem.steps" :key="index">{{ item }}</p>
          </div>
          <p class="modal-package__note"><span class="package-highlight">Lưu ý: </span>{{ packageItem.note }}</p>
          <p>{{ packageItem.example }}</p>
        </div>
      </div>
    </div>
    <div class="modal-package__btn">
      <div class="btn-bg"></div>
      <div class="btn-select">
        <BaseButton class="base-button btn base-button--bg-red btn--type1" @click="selectPackage()">CHỌN KHUYẾN MÃI</BaseButton>
      </div>
    </div>
  </b-modal>
</template>

<script>
import modalMixin from '~/mixins/user/modal'
import BaseButton from '~common/base-button'
import { PromotionPackage } from '~/resources/promotion-package'

export default {
  components: {
    BaseButton
  },
  mixins: [modalMixin],
  props: {
    currentPackage: {
      type: String,
      default: ''
    }
  },
  computed: {
    packageItem () {
      return PromotionPackage[this.currentPackage]
    }
  },
  methods: {
    selectPackage () {
      this.$emit('selectPackage', this.currentPackage)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/common/modal-package.scss"></style>
