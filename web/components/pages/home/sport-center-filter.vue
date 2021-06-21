<template>
  <div>
    <GameCenterInfo />
    <GameCenterSelect @change="$emit('change', $event)" />
  </div>
</template>

<script>
import GameCenterInfo from '~lobby/game-center-info'
import GameCenterSelect from '~lobby/game-center-select'

export default {
  components: {
    GameCenterInfo,
    GameCenterSelect
  }
}
</script>

<style scoped lang="scss" src=""></style>
