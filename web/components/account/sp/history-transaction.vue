<template>
  <div class="history-transaction">
    <div class="history-transaction__top">
      <HistoryFilters :config="config" :filters="filters" @eventClick="handleSearch" />
    </div>
    <div class="history-transaction__bot" :class="{'loading' : isLoading}">
      <div v-if="historyList && historyList.length" class="history-transaction__content">
        <HistoryItem v-for="(item, key) in historyList" :id="key" :key="key">
          <template #title>
            {{ item.type }}
          </template>
          <template #money>
            {{ item.action === 'DEPOSIT' ? '+' : '-' }}
            {{ item.amount | formatMoney }} Đ
          </template>
          <template #time>
            {{ item.timeArr }}
          </template>
          <template #status>
            <span :class="item.status.statusClass">{{ item.status.statusText }}</span>
          </template>
          <template #content>
            <p>
              ID <span class="ref-no">{{ item.id }}</span>
            </p>
            <p>
              Phương thức <span class="bet-money">{{ item.toBankCode }}</span>
            </p>
            <p>
              Mã GD <span class="reward">{{ item.bankTransactionCode }}</span>
            </p>
          </template>
          <template v-if="item.transactionNote" #note>
            <div class="history-transaction__note">
              {{ item.transactionNote }}
            </div>
          </template>
        </HistoryItem>
      </div>
      <div v-else class="history-transaction__no-content">
        Không có dữ liệu để hiển thị
      </div>
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
import HistoryItem from './history-item'
import HistoryTransaction from '~/mixins/account/history-transaction'
import globalMixin from '~/mixins/global-mixin'
import Pagination from '~common/pagination'
import { MODAL } from '~/config/constant'

export default {
  components: {
    HistoryFilters,
    HistoryItem,
    Pagination
  },
  mixins: [globalMixin, HistoryTransaction],
  data () {
    return {
      config: {
        id: MODAL.HISTORY_TRANSACTION,
        class: 'modal--type1'
      }
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/account/sp/history-transaction.scss"></style>
