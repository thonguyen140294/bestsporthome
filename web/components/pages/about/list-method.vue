<template>
  <section class="list-method">
    <div v-for="method in methods" :key="method.id" class="list-method__item" @click.prevent="$_navigationMixin_navigate(method.link, true, false, true)">
      <div class="list-method__icon">
        <img :src="require(`~imageAsset/account/sp/deposit-section/${method.icon}.svg`)" alt="">
      </div>
      <p class="list-method__name">
        {{ method.title }}
      </p>
    </div>
  </section>
</template>
<script>
import { listMethods } from '~/resources/about'
import navigationMixin from '~/mixins/navigation'

export default {
  mixins: [navigationMixin],
  data () {
    return {
      methods: listMethods
    }
  }
}
</script>
<style lang="scss" src="~scssAsset/pages/about/list-method.scss">
</style>
