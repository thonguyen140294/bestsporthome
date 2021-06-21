<template>
  <b-dropdown id="dropdown-1" :html="buttonHtml" class="lobby-search__dropdown">
    <b-dropdown-item @click="clickDropdown()" href="javascript:void(0)" id="default-option">
      <span>Tất cả ví</span>
      <span v-if="currentUser && $device.isDesktopOrTablet">-</span><span v-if="currentUser && $device.isDesktopOrTablet" class="lobby-search__highlight"> {{ getBalance['all'] || getBalance['default'] | formatAmountUnit(1) }} Đ</span>
    </b-dropdown-item>
    <b-dropdown-item v-for="(item, index) in optionsGameWallet" :id="item.value" :key="index" @click="clickDropdown(item)" href="javascript:void(0)">
      Game <span :class="{'lobby-search__highlight' : currentUser}">{{ item.text }}</span>
      <span v-if="currentUser && $device.isDesktopOrTablet">-</span><span v-if="currentUser && $device.isDesktopOrTablet" class="lobby-search__highlight"> {{ getBalance[item.value] || getBalance['default'] | formatAmountUnit(1) }} Đ</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    currentUser: {
      type: Object,
      default: () => {}
    },
    getBalance: {
      type: Object,
      default: () => {}
    },
    optionsGameWallet: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      buttonHtml: '',
      selectedOption: 'default-option'
    }
  },
  mounted () {
    this.buttonHtml = this.currentUser ? `<p>Tất cả ví - <span style="color: #FEBC1F">${this.$options.filters.formatAmountUnit(this.getBalance['all' || 'default'], 1)} Đ</span></p>` : '<p>Tất cả ví</p>'

    const self = this
    $('.dropdown-menu').hover(function () {
      $(this).find('.lobby-search__dropdown-default').removeClass('lobby-search__dropdown-default')
    })
    $('.dropdown-toggle').on('click', function () {
      $('.dropdown-menu').find(`a#${self.selectedOption}`).addClass('lobby-search__dropdown-default')
    })
  },
  methods: {
    clickDropdown (item) {
      const balance = item ? this.$options.filters.formatAmountUnit(this.getBalance[item.value || 'default'], 1)
        : this.$options.filters.formatAmountUnit(this.getBalance['all' || 'default'], 1)
      if (item) {
        this.buttonHtml = this.currentUser ? `<p>Game <span style="color: #FEBC1F">${item.text}</span> - <span style="color: #FEBC1F">${balance} Đ</span></p>` : `Game ${item.text}`
        this.selectedOption = item.value
        this.$emit('click', item.value)
      } else {
        this.buttonHtml = this.currentUser ? `<p>Tất cả ví - <span style="color: #FEBC1F">${balance} Đ</span></p>` : 'Tất cả ví'
        this.selectedOption = 'default-option'
        this.$emit('click', 'all')
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/lobby-search.scss"></style>
