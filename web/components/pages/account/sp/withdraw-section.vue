<template>
  <div class="withdraw-section">
    <WrapperAccount v-if="!$route.query.type" :title="tabInfo.title" @back="$router.push('/account')">
      <div class="withdraw-section__wallet">
        <p>
          <span>Số dư ví C</span>
          <b class="money-main">{{ $store.state.globalMainBalance || 0 | formatAmountUnit(1) }} Đ</b>
        </p>
      </div>
      <div class="withdraw-method">
        <div v-for="item in methods" :key="item.title" class="withdraw-method__item">
          <nuxt-link :to="item.link" class="withdraw-method__link" />
          <p class="withdraw-method__icon">
            <img :src="require(`~imageAsset/account/sp/deposit-section/${item.icon}.svg`)" :alt="item.icon">
          </p>
          <p class="withdraw-method__text">{{ item.title }}</p>
        </div>
      </div>
    </WrapperAccount>

    <WrapperAccount v-else :title="currentTab.title" @back="$router.push('/account?tab=withdraw')">
      <v-component :is="currentTab.component" />
    </WrapperAccount>
  </div>
</template>

<script>

import WrapperAccount from './wrapper-account'

import WithdrawBankForm from '~account/sp/withdraw-bank-form'
import WithdrawCardForm from '~account/sp/withdraw-card-form'

export default {
  components: {
    WrapperAccount
  },
  props: {
    tabInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      methods: [
        {
          title: 'Ngân hàng',
          icon: 'banking',
          link: '/account?tab=withdraw&type=banking'
        },
        {
          title: 'Thẻ cào điện thoại',
          icon: 'card',
          link: '/account?tab=withdraw&type=phone_card'
        }
      ]
    }
  },
  computed: {
    subTabList () {
      return [
        {
          method: 'banking',
          title: 'NGÂN HÀNG',
          component: WithdrawBankForm
        },
        {
          method: 'phone_card',
          title: 'Thẻ cào',
          component: WithdrawCardForm
        }
      ]
    },
    currentTab () {
      return this.subTabList.find(item => item.method === this.$getRoute(this.$route).query.type) || {}
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/pages/account/sp/withdraw-section.scss"></style>
