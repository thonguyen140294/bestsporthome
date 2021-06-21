<template>
  <div class="list-bank">
    <div v-for="bank in banks" :key="bank.id" class="list-bank__item">
      <img :src="bank.img" alt="">
    </div>
  </div>
</template>
<script>
import { listBanks } from '~/resources/about'

export default {
  data () {
    return {
      banks: listBanks
    }
  }
}
</script>
<style lang="scss" src="~scssAsset/pages/about/list-bank.scss">
</style>
