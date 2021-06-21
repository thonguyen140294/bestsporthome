<template>
  <div class="modal-close" @click.prevent="$_modalMixin_closeAllModal">
    <img :src="require('~imageRoot/icons/left-slide.svg')" alt="">
    Quay lại
  </div>
</template>

<script>
import modalMixin from '~/mixins/user/modal'
export default {
  mixins: [modalMixin]
}
</script>

<style scoped lang="scss" src="~scssAsset/common/modal-close.scss"></style>
