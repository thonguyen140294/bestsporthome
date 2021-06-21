import $ from 'jquery'
import { MODAL_PANEL, MODAL_CLOSE } from '~/config/constant'
import modalMixin from '~/mixins/user/modal'

export default {
  methods: {
    $_panelMenuMixin_reset () {
      $('.bottom-bar').removeClass('active')
      $('.bottom-bar-item').removeClass('active')
    }
  },
  mixins: [modalMixin],
  watch: {
    $route () {
      this.$_modalMixin_closeAllModal()
      this.$_panelMenuMixin_reset()
    }
  },
  mounted () {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      if (MODAL_PANEL.includes(modalId)) {
        this.$_panelMenuMixin_reset()
      }
      if (MODAL_CLOSE.includes(modalId)) {
        $('.modal-close').addClass('show')
      }
    })
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      if (MODAL_PANEL.includes(modalId)) {
        this.$_panelMenuMixin_reset()
      }
      if (MODAL_CLOSE.includes(modalId)) {
        $('.modal-close').removeClass('show')
      }
    })
    this.$nextTick(() => {
      $('.page').removeClass('hide')
    })
  }
}
