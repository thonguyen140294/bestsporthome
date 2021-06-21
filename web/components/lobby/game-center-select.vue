<template>
  <div class="game-center-select">
    <select
      v-model="selected"
      class="select"
      @change="$emit('change', selected)"
    >
      <option v-for="(item, index) in options" :key="index" :value="item.value">
        {{ item.text }}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      selected: 'all',
      options: [
        {
          text: 'Tất cả',
          value: 'all'
        },
        {
          text: 'Quick Games',
          value: 'quickgame'
        },
        {
          text: 'Jackpots',
          value: 'jackpots'
        },
        {
          text: 'Slots',
          value: 'slot'
        },
        {
          text: 'Bắn Cá',
          value: 'fishing'
        },
        {
          text: 'Quay Số',
          value: 'lottery'
        },
        {
          text: 'InGame',
          value: 'ingame'
        },
        {
          text: 'Instant Games',
          value: 'instant_games'
        },
        {
          text: 'Lô Đề',
          value: 'lode'
        },
        {
          text: 'Battle Games',
          value: 'battle_games'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/game-center-select.scss">
</style>
