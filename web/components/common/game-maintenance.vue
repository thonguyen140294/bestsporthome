<template>
  <b-modal
    id="game-maintenance-modal"
    v-model="show"
    modal-class="maintenance"
    :hide-header="true"
    :hide-footer="true"
    @hide="onClose"
  >
    <p class="close" @click="onClose" />
    <div class="modal-maintenance-content">
      <div class="modal-body">
        <p class="img-wallet">
          <img :src="require('~imageRoot/icons/game-maintain.svg')" alt="">
        </p>
        <p class="modal-maintenance-content__title mb-1">
          GAME ĐANG BẢO TRÌ
        </p>
        <p class="modal-maintenance-content__des">
          Vui lòng quay lại sau hoặc chọn game khác.
        </p>
        <div class="modal-maintenance-content__shadow-line"></div>
        <div class="modal-maintenance-content__wrap-btn">
          <BaseButton class="btn btn-history" width="100%" class-name="base-button--transfer base-button--bg-red" @click="onClose()">ĐÓNG</BaseButton>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import globalMixin from '~/mixins/global-mixin'
import maintenanceMixin from '~/mixins/maintenance'
import BaseButton from '~common/base-button'

export default {
  components: {
    BaseButton
  },
  mixins: [globalMixin, maintenanceMixin],
  computed: {
    show: {
      get () {
        return this.$store.state.maintenance.showGameMaintenance
      },
      set (isShowGameMaintenance) {
        this.$store.commit('maintenance/setShowGameMaintenance', isShowGameMaintenance)
      }
    }
  },
  methods: {
    onClose () {
      this.$store.commit('maintenance/setShowGameMaintenance', false)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/common/maintenance.scss"></style>
