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
          text: 'Câu lạc bộ',
          value: 'club'
        },
        {
          text: 'Quốc gia',
          value: 'nation'
        },
        {
          text: 'Áo khoác',
          value: 'jacket'
        },
        {
          text: 'Áo pitch',
          value: 'pitch'
        },
        {
          text: 'Giày',
          value: 'shoe'
        },
        {
          text: 'Găng tay',
          value: 'gloves'
        },
        {
          text: 'Balo',
          value: 'balo'
        },
      ]
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/game-center-select.scss">
</style>
