<template>
  <div ref="bottomBar" class="bottom-bar">
    <BottomBarItem
      v-for="(item, index) in showItems"
      :key="index"
      :ref="item.id"
      :item="item"
      :class="item.id"
      @eventClick="eventClick"
    />
  </div>
</template>

<script>
import BottomBarItem from './bottom-bar-item'
import modalMixin from '~/mixins/user/modal'
import { bottomBar } from '~/resources/bottom-bar'
export default {
  components: {
    BottomBarItem,
  },
  mixins: [modalMixin],
  data () {
    return {
      items: bottomBar
    }
  },
  computed: {
    isLogged () {
      return this.$store.getters.isLogged
    },
    showItems () {
      if (this.isLogged) {
        return this.items.filter(item => item.showLogin)
      }
      return this.items.filter(item => item.showNotLogin)
    }
  },
  watch: {
    $route: {
      handler () {
        this.$nextTick(() => {
          this.activeBottomBarWithRouter()
        })
      }
    }
  },
  methods: {
    eventClick (item) {
      const bottomObj = {
        item,
        refs: this.$refs
      }
      this.$emit('eventClick', bottomObj)
    },
    activeBottomBarWithRouter () {
      const routerActive = {
        promotion: '/ve-chung-toi?tab=khuyen-mai'
      }
      const findActiveRoute = this.items.find(item => this.$route.fullPath === routerActive[item.id])
      if (findActiveRoute) {
        this.$refs.bottomBar.classList.add('active')
        if (this.$refs[findActiveRoute.id] && this.$refs[findActiveRoute.id][0]) {
          this.$refs[findActiveRoute.id][0].$el.classList.add('active')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/common/bottom-bar.scss"></style>
