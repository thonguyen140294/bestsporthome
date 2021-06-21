<template>
  <b-modal
    id="maintenance-modal"
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
          <img :src="require('~imageRoot/icons/icon-transfer.svg')" alt="">
        </p>
        <p class="modal-maintenance-content__title mb-1">
          BẢO TRÌ TÀI KHOẢN VÍ CHÍNH
        </p>
        <div v-if="!maintenance.enabled" class="modal-maintenance-content__des">
          <p class="maintenance-inform">Nhà cung cấp sẽ bảo trì tài khoản Ví Chính trong vòng 5 phút nữa. Qúy khách vui lòng chuyển tiền qua Ví Phụ để tiếp tục trải nghiệm.</p>
        </div>
        <p v-if="maintenance.startTime && maintenance.endTime" class="modal-maintenance-content__des">
          Thời gian bảo trì dự kiến: Từ <span class="maintenance-highlight">{{ startTime }}</span> đến <span class="maintenance-highlight">{{ endTime }}</span>
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
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import { DATETIME_FORMAT } from '~/config/constant'
import globalMixin from '~/mixins/global-mixin'
import maintenanceMixin from '~/mixins/maintenance'
import BaseButton from '~common/base-button'

export default {
  components: {
    BaseButton
  },
  mixins: [globalMixin, maintenanceMixin],
  computed: {
    ...mapState('maintenance', { maintenance: 'maintenance' }),
    startTime () {
      return dayjs(this.maintenance.startTime).format(DATETIME_FORMAT.MAINTENANCE_FORMAT)
    },
    endTime () {
      return dayjs(this.maintenance.endTime).format(DATETIME_FORMAT.MAINTENANCE_FORMAT)
    },
    show: {
      get () {
        return this.$store.state.maintenance.showMaintenance
      },
      set (isShowMaintenance) {
        this.$store.commit('maintenance/setShowMaintenance', isShowMaintenance)
      }
    }
  },
  methods: {
    onClose () {
      this.$store.commit('maintenance/setShowMaintenance', false)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/common/maintenance.scss"></style>
