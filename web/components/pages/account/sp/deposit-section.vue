<template>
  <div class="deposit-section">
    <WrapperAccount v-if="!$route.query.type" :title="tabInfo.title" @back="$router.push('/account')">
      <div class="deposit-section__wallet">
        <p>
          <span>Số dư ví C</span>
          <b class="money-main">{{ $store.state.globalMainBalance || 0 | formatAmountUnit(1) }} Đ</b>
        </p>
      </div>
      <div class="deposit-method">
        <div v-for="item in methods" :key="item.title" class="deposit-method__item">
          <nuxt-link :to="item.link" class="deposit-method__link" />
          <p class="deposit-method__icon">
            <img :src="require(`~imageAsset/account/sp/deposit-section/${item.icon}.svg`)" :alt="item.icon">
          </p>
          <p class="deposit-method__text">{{ item.title }}</p>
        </div>
      </div>
    </WrapperAccount>

    <WrapperAccount v-else :title="currentTab.title" @back="$router.push('/account?tab=deposit')">
      <v-component :is="currentTab.component" />
    </WrapperAccount>
  </div>
</template>

<script>

import WrapperAccount from './wrapper-account'

import DepositBankForm from '~account/sp/deposit-bank-form'
import DepositPaywinForm from '~account/sp/deposit-paywin-form'
import DepositMomoForm from '~account/sp/deposit-momo-form'
import DepositCardForm from '~account/sp/deposit-card-form'

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
          title: 'Paywin',
          icon: 'paywin',
          link: '/account?tab=deposit&type=paywin'
        },
        {
          title: 'Internet banking',
          icon: 'internet',
          link: '/account?tab=deposit&type=banking'
        },
        {
          title: 'ATM',
          icon: 'atm',
          link: '/account?tab=deposit&type=atm'
        },
        {
          title: 'Ngân hàng',
          icon: 'banking',
          link: '/account?tab=deposit&type=taiquay'
        },
        {
          title: 'Thẻ cào điện thoại',
          icon: 'card',
          link: '/account?tab=deposit&type=phone_card'
        },
        {
          title: 'Ví điện tử Momo',
          icon: 'momo',
          link: '/account?tab=deposit&type=momo'
        }
      ]
    }
  },
  computed: {
    subTabList () {
      return [
        {
          method: 'banking',
          title: 'Internet banking',
          component: DepositBankForm
          // props: {
          //   banks: this.banks,
          //   packages: this.packages,
          //   method: this.subTab
          // }
        },
        {
          method: 'atm',
          title: 'ATM',
          component: DepositBankForm
          // props: {
          //   banks: this.banks,
          //   packages: this.packages,
          //   method: this.subTab
          // }
        },
        {
          method: 'taiquay',
          title: 'NGÂN HÀNG',
          component: DepositBankForm
          // props: {
          //   banks: this.banks,
          //   packages: this.packages,
          //   method: this.subTab
          // }
        },
        {
          method: 'paywin',
          title: 'Paywin',
          component: DepositPaywinForm
          // props: {
          //   banks: this.banks,
          //   packages: this.packages
          // }
        },
        {
          method: 'momo',
          title: 'Momo',
          component: DepositMomoForm
          // props: {
          //   momos: this.momos,
          //   packages: this.packages
          // }
        },
        {
          method: 'phone_card',
          title: 'Thẻ cào',
          component: DepositCardForm
          // props: {
          //   telecoms: this.telecoms,
          //   packages: this.packages
          // }
        }
      ]
    },
    currentTab () {
      return this.subTabList.find(item => item.method === this.$getRoute(this.$route).query.type) || {}
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/pages/account/sp/deposit-section.scss"></style>
