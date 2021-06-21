<template>
  <div class="history-transaction" :class="{'loading' : isLoading}">
    <div class="history-transaction__top">
      <HistoryFilters :filters="filters" @eventClick="handleSearch" />
    </div>
    <div class="history-transaction__bot">
      <HistoryTable :headers="headers" :items="historyList" :fields="fields" :loading-button="isLoading">
        <template #action="{ data }">
          {{ data === 'DEPOSIT' ? 'Nạp' : 'Rút' }}
        </template>
        <template #amount="{ data }">
          {{ data | formatMoney }} Đ
        </template>
        <template #status="{ data }">
          <span :class="data.statusClass">
            {{ data.statusText }}
          </span>
        </template>
      </HistoryTable>
      <div class="history-transaction__pagination">
        <Pagination
          v-if="total > 10"
          :total="total"
          :per-page="10"
          :reset="resetPage"
          @handle-page="handlePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HistoryFilters from './history-filters'
import HistoryTransaction from '~/mixins/account/history-transaction'
import globalMixin from '~/mixins/global-mixin'
import HistoryTable from '~common/history-table'
import Pagination from '~common/pagination'

export default {
  components: {
    HistoryFilters,
    HistoryTable,
    Pagination
  },
  mixins: [globalMixin, HistoryTransaction]
}
</script>

<style lang="scss" scoped src="~scssAsset/account/history-transaction.scss"></style>
