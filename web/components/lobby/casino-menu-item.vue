<template>
  <li class="game-menu-item">
    <span v-if="item.label" :class="['game-menu-item__label', `${item.label}-label`]">{{ item.label }}</span>
    <a :class="itemClass" class="game-menu-item__link" @click="clickMenuItem(item)">{{ item.title }}</a>
  </li>
</template>

<script>

export default {
  components: {
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    tab: {
      type: String,
      default: ''
    }
  },
  computed: {
    itemClass () {
      if (this.$getRoute(this.$route).query.game === this.tab || (this.tab === 'allgame' && !this.$getRoute(this.$route).query.game)) {
        return 'active'
      }
      return ''
    }
  },
  methods: {
    clickMenuItem (item) {
      this.$router.push({ query: { game: item.gameQuery }, params: { savePosition: true } })
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/game-menu-item.scss">
</style>
