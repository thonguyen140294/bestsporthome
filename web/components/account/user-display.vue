<template>
  <nuxt-link class="user-display" to="/account" @click.native="$_panelMenuMixin_closePanelMenu()">
    <i class="fal fa-user-circle" />
    <p>{{ currentUserFullName }}</p>
  </nuxt-link>
</template>

<script>
import globalMixin from '~/mixins/global-mixin'
import panelMenuMixin from '~/mixins/panel-menu'

export default {
  mixins: [globalMixin, panelMenuMixin]
}
</script>

<style scoped lang="scss" src="~scssAsset/common/user-display.scss">
</style>
