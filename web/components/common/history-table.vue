<template>
  <div class="history-table">
    <table class="table history-table__wrap" cellpadding="0" cellspacing="0" border="0" width="100%">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <template>
          <tr v-if="!items.length && !isLoading" class="text-center">
            <td :colspan="headers.length">Không có dữ liệu để hiển thị</td>
          </tr>
          <tr v-for="(item, index) in items" v-else :key="index">
            <td v-for="(field, key) in fields" :key="key">
              <slot v-if="$scopedSlots[field]" :name="field" :data="item[field]" />
              <p v-else>{{ item[field] }}</p>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/common/history-table.scss"></style>
