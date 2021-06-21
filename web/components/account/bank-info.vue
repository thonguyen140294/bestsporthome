<template>
  <div v-if="bank" class="bank-info">
    <template v-for="item in infoList">
      <div v-if="!item.hide" :key="item.account_no" class="bank-info__item">
        <div v-if="!item.hide" class="bank-info__content">
          <p>{{ item.title }}</p>
          <b>{{ item.value }}</b>
        </div>
        <div class="bank-info__copy" :class="{ active: item.active }" :title="item.active ? 'Đã Sao Chép' : 'Sao Chép'" @click="doCopy(item.value)" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    bank: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      copyValue: ''
    }
  },
  computed: {
    infoList () {
      return [
        {
          title: 'Chủ tài khoản',
          value: this.bank.account_name,
          active: this.copyValue === this.bank.account_name
        },
        {
          title: 'Số tài khoản',
          value: this.bank.account_no,
          active: this.copyValue === this.bank.account_no
        },
        {
          title: 'Chi nhánh ngân hàng',
          value: `${this.bank.bank_name} - ${this.bank.branch_name}`,
          active: this.copyValue === `${this.bank.bank_name} - ${this.bank.branch_name}`,
          hide: !this.bank.branch_name
        }
      ]
    }
  },
  watch: {
    bank () {
      this.copyValue = ''
    }
  },
  methods: {
    doCopy (value) {
      this.$copyText(value).then(() => {
        this.copyValue = value
      })
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/account/bank-info.scss"></style>
