<template>
  <div :class="['lobby-search', { 'searching': isSearching }]">
    <div class="lobby-search__filter">
      <div class="lobby-search__filter__supplier">
        <select v-model="selectedProvider" class="select" @change="$emit('change-provider', selectedProvider)">
          <option v-for="(item, index) in optionsProvider" :key="index" :value="item.value">
            {{ item.text }}
          </option>
        </select>
      </div>

      <CustomWalletDropdown :current-user="currentUser" :get-balance="getBalance" :options-game-wallet="optionsGameWallet" @click="clickDropdown" />
    </div>
    <div class="lobby-search__input">
      <div class="lobby-search__input__wrap">
        <input
          ref="searchGameName"
          v-model="searchGameName"
          type="text"
          :class="['lobby-search__input__wrap__control', { 'searching': isSearching }]"
          placeholder="Tìm kiếm..."
          @input="$emit('search-game-name', searchGameName)"
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
import CustomWalletDropdown from '~common/custom-wallet-dropdown'

export default {
  components: {
    CustomWalletDropdown
  },
  data () {
    return {
      searchGameName: '',
      selectedGameWallet: WALLET.ALL,
      optionsGameWallet: [
        {
          text: 'Ví [C]',
          value: WALLET.MAIN
        },
        {
          text: 'Ví [P]',
          value: WALLET.SUB
        }
      ],
      selectedProvider: 'all',
      optionsProvider: [
        {
          text: 'Tất cả NCC',
          value: 'all'
        },
        {
          text: 'Techplay',
          value: 'Techplay'
        },
        {
          text: 'CQ9 Gaming',
          value: 'CQ9'
        },
        {
          text: 'Spribe Gaming',
          value: 'Spribe Games'
        },
        {
          text: 'PG Soft',
          value: 'PGSoft'
        }
      ],
      isSearching: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'globalSubBalance', 'globalMainBalance']),
    providerCurrent () {
      return this.$store.state.games.selectedProvider
    },
    getBalance () {
      return {
        [WALLET.SUB]: this.globalSubBalance,
        [WALLET.MAIN]: this.globalMainBalance,
        [WALLET.ALL]: this.globalMainBalance + this.globalSubBalance,
        default: 0
      }
    }
  },
  watch: {
    providerCurrent: {
      handler (value) {
        this.selectedProvider = value
        this.$emit('changeProvider', this.selectedProvider)
      },
      immediate: true
    }
  },
  methods: {
    cleanSearch () {
      this.toggleOpenSearch()
      this.searchGameName = ''
      this.$emit('search-game-name', '')
    },
    toggleOpenSearch (e) {
      this.isSearching = !this.isSearching
      if (this.isSearching) {
        this.$refs.searchGameName.focus()
        if (e && e.keyCode === 13) {
          this.$refs.searchGameName.blur()
          this.$emit('search-game-name', this.searchGameName)
        }
      } else {
        this.$refs.searchGameName.blur()
      }
      this.$emit('searched', this.isSearching)
    },
    clickDropdown (value) {
      this.$emit('change-game-wallet', value)
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/lobby-search.scss"></style>
