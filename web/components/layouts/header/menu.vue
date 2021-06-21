<template>
  <div id="header_scroll" class="menu header__classic">
    <div class="container">
      <ul class="header--menu_nav flex-box">
        <li
          v-for="(item, index) in menus.menus"
          :key="index"
          class="header--menu__item"
          :class="{'show-sub' : typeof item.subMenu !== 'undefined' }"
        >
          <a class="header--menu__link custom-after" href="javascript:void(0)" :title="item.title">
            <span v-if="item.label === 'live'" class="menu-live">live</span>
            <span v-if="item.label === 'hot-2'" class="menu-live">hot</span>
            {{ item.title }}
            <span v-if="item.label === 'new'" class="menu-note">NEW</span>
            <span v-if="item.label === 'hot'" class="menu-note hot">HOT</span>
            <span v-if="item.label === 'event'" class="menu-note">EVENT</span>
          </a>
          <div v-if="item.subMenu !== 'undefined'" class="header--menu__sub" :class="item.subMenuClass">
            <ul class="content-submenu">
              <li v-for="(subItem, i) in item.subMenu" :key="i" class="header--menu__item" :class="{'active': $route.fullPath === subItem.link }">
                <a v-if="subItem.loginRequired && !subItem.playGame" class="header--menu__link" :href="subItem.link" :title="subItem.title">
                  <span class="group-label">
                    {{ subItem.title }}
                    <span v-if="subItem.label === 'new'" class="menu-note">NEW</span>
                    <span v-if="subItem.label === 'hot'" class="menu-note hot">HOT</span>
                  </span>
                </a>
                <a v-else-if="!!subItem.playGame" class="header--menu__link" href="#" :title="subItem.title">
                  <span class="group-label">
                    {{ subItem.title }}
                    <span v-if="subItem.label === 'new'" class="menu-note">NEW</span>
                    <span v-if="subItem.label === 'hot'" class="menu-note hot">HOT</span>
                  </span>
                </a>
                <n-link v-else :to="subItem.link" class="header--menu__link" :title="subItem.title">
                  <span class="group-label">
                    {{ subItem.title }}
                    <span v-if="subItem.label === 'new'" class="menu-note">NEW</span>
                    <span v-if="subItem.label === 'hot'" class="menu-note hot">HOT</span>
                  </span>
                </n-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import navigationMixin from '~/mixins/navigation'
import { menus } from '~/resources/menu'

export default {
  components: {

  },
  mixins: [navigationMixin],
  data () {
    return {
      menus
    }
  },
  methods: {
    active (name) {
      if (this.$getRoute(this.$route).name === 'lobby' && name === 'game-center') {
        return 'menu__link__active'
      }
      if (this.$getRoute(this.$route).name && this.$getRoute(this.$route).name.includes(name)) {
        return 'menu__link__active'
      }
      return ''
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/header/menu.scss"></style>
