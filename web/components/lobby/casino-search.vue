<template>
  <div :class="['lobby-search', { 'searching': isSearching }]">
    <div class="lobby-search__filter">
      <div class="lobby-search__filter__supplier">
        <select v-model="selectedProvider" disabled class="select" @change="$emit('change-provider', selectedProvider)">
          <option v-for="(item, index) in optionsProvider" :key="index" :value="item.value">
            {{ item.text }}
          </option>
        </select>
      </div>
      <div class="lobby-search__filter__wallet">
        <select v-model="selectedCasinoWallet" disabled class="select select--wallet" @change="$emit('change-casino-wallet', selectedCasinoWallet)">
          <option v-for="(item, index) in optionsCasinoWallet" :key="'wallet' + index" :value="item.value">
            {{ item.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="lobby-search__input">
      <div class="lobby-search__input__wrap">
        <input
          ref="searchGameName"
          v-model="searchCasinoName"
          type="text"
          :class="['lobby-search__input__wrap__control', { 'searching': isSearching }]"
          placeholder="Tìm kiếm..."
          @input="$emit('search-casino-name', searchCasinoName)"
          @keyup.enter="toggleOpenSearch"
        >
      </div>
      <button class="btn--search" title="Tìm trò chơi" @click.prevent="cleanSearch"><span class="search" /></button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { WALLET } from '@/config/constant'

export default {
  components: {},
  data () {
    return {
      searchCasinoName: '',
      selectedCasinoWallet: 'SUB_WALLET',
      optionsCasinoWallet: [
        {
          text: 'Casino Ví [P]',
          value: WALLET.SUB
        }
      ],
      selectedProvider: 'Evolution',
      optionsProvider: [
        {
          text: 'Evolution',
          value: 'Evolution'
        }
      ],
      isSearching: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'globalSubBalance']),
    getBalance () {
      return {
        [WALLET.SUB]: this.globalSubBalance,
        default: 0
      }
    }
  },
  methods: {
    cleanSearch () {
      this.toggleOpenSearch()
      this.searchCasinoName = ''
      this.$emit('search-casino-name', '')
    },
    toggleOpenSearch (e) {
      this.isSearching = !this.isSearching
      if (this.isSearching) {
        this.$refs.searchGameName.focus()
        if (e && e.keyCode === 13) {
          this.$refs.searchGameName.blur()
          this.$emit('search-casino-name', this.searchCasinoName)
        }
      } else {
        this.$refs.searchGameName.blur()
      }
      this.$emit('searched', this.isSearching)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/lobby-search.scss"></style>
