<template>
  <div class="history-sport">
    <div class="history-sport__top">
      <HistoryFilters :config="config" :filters="filters" :startdate="dateRange.startDate" @eventClick="handleSearch" />
    </div>
    <div class="history-sport__bot" :class="{'loading' : isLoading}">
      <div v-if="sportHistoryList && sportHistoryList.length" class="history-sport__content">
        <HistoryItem v-for="(item, key) in sportHistoryList" :id="key" :key="key">
          <template #title>
            <div v-if="item.sportType.product === 'sportbook'">
              <p class="table-custom__txt table-custom__txt--bb">
                {{ item.sportType.product }}
              </p>
              <p class="table-custom__txt table-custom__txt--green">
                {{ item.sportType.betTypeName }} {{ item.sportType.note }}
              </p>
              <p class="table-custom__txt table-custom__txt--yellow">
                {{ item.sportType.homeName }} vs ${{ item.sportType.awayName }}
              </p>
              <p class="table-custom__txt table-custom__txt--black">
                {{ item.sportType.leagueName }}
              </p>
            </div>
            <div v-else>
              {{ item.sportType.product }}
            </div>
          </template>
          <template #money>
            {{ item.winLostText }}
          </template>
          <template #time>
            {{ item.timeArr }}
          </template>
          <template #status>
            <span :class="item.status.statusClass">{{ item.status.statusText }}</span>
          </template>
          <template #content>
            <p>
              Ref No <span class="ref-no">{{ item.transId }}</span>
            </p>
            <p>
              Số tiền cược <span class="bet-money">{{ item.stake }}</span>
            </p>
            <p>
              Thưởng <span class="reward">{{ item.bonus }}</span>
            </p>
          </template>
        </HistoryItem>
      </div>
      <div v-else class="history-sport__no-content">
        Không có dữ liệu để hiển thị
      </div>
      <div class="history-sport__pagination">
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
import HistorySport from '~/mixins/account/history-sport'
import globalMixin from '~/mixins/global-mixin'
import Pagination from '~common/pagination'
import { MODAL } from '~/config/constant'

export default {
  components: {
    HistoryFilters,
    HistoryItem,
    Pagination
  },
  mixins: [globalMixin, HistorySport],
  data () {
    return {
      config: {
        id: MODAL.HISTORY_SPORTS,
        class: 'modal--type1'
      }
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/account/sp/history-sport.scss"></style>
