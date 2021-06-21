<template>
  <component :is="component" />
</template>

<script>
import { cardInfo } from '~/resources/account'
import ACCOUNT_API from '~/api/account'
import Desktop from '~/components/pages/account/index'
import Mobile from '~/components/pages/account/sp/index'
import simplePageMixin from '~/mixins/simple-page'

export default {
  layout: 'default',
  middleware: 'auth',
  mixins: [simplePageMixin],
  data () {
    return {
      component: Desktop
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.getElementById('page').classList.add('page--account')
    })
    this.component = window.innerWidth <= 980 ? Mobile : Desktop
    window.addEventListener('resize', this.onResize)
    this.fetchUserBanks()
    this.fetchBanks()
    this.fetchPromotionPackages()
    this.fetchMomos()
    this.fetchTelecoms()
  },
  destroyed () {
    document.getElementById('page').classList.remove('page--account')
  },
  methods: {
    onResize () {
      this.component = window.innerWidth <= 980 ? Mobile : Desktop
    },
    async fetchUserBanks () {
      try {
        const { status, data } = await this.$axios.$get(ACCOUNT_API.USER_BANKS)
        if (status === 'OK') {
          this.$store.commit('updateUserBanks', data)
        }
      } catch (error) {
        return false
      }
    },
    async fetchBanks () {
      try {
        const { status, data } = await this.$axios.$get(ACCOUNT_API.BANK_LIST)
        if (status === 'OK') {
          const allBankPromise = []
          for (const bank of data) {
            allBankPromise.push(this.$axios.$get(ACCOUNT_API.BANK_ACCOUNT, { params: { bank_code: bank.bank_code } }))
          }
          const allBankDetails = await Promise.all(allBankPromise.map(p => p.catch(e => e)))
          for (let i = 0; i < allBankDetails.length; i++) {
            if (allBankDetails[i] instanceof Error) {
              data[i].isMaintain = true
            }
          }
          this.$store.commit('updateBanks', data)
        }
      } catch (error) {
        return false
      }
    },
    async fetchPromotionPackages () {
      try {
        const { status, data } = await this.$axios.$get(ACCOUNT_API.PROMOTION_PACKAGE)
        if (status === 'OK' && data) {
          this.$store.commit('updatePackages', data)
        }
      } catch (error) {
        return false
      }
    },
    async fetchMomos () {
      try {
        const { status, data } = await this.$axios.$get(ACCOUNT_API.MOMO_LIST)
        if (status === 'OK' && data) {
          this.$store.commit('updateMomos', data)
        }
      } catch (error) {
        return false
      }
    },
    fetchTelecoms () {
      const data = []
      for (const [key, value] of Object.entries(cardInfo.cardlist)) {
        value.telco = key
        data.push(value)
      }
      this.$store.commit('updateTelecoms', data)
    }
  }
}
</script>

<style></style>
