<template>
  <div class="history-betting">
    <div class="history-betting__top">
      <HistoryFilters :config="config" :filters="filters" :startdate="dateRange.startDate" @eventClick="handleSearch" />
    </div>
    <div class="history-betting__bot" :class="{'loading' : isLoading}">
      <div v-if="betHistoryList && betHistoryList.length" class="history-betting__content">
        <HistoryItem v-for="(item, key) in betHistoryList" :id="key" :key="key">
          <template #title>
            <div v-if="item.sportType.sportType === 1">
              <p v-if="item.sportType.sportName && item.sportType.product" class="table-custom__txt table-custom__txt--bb">
                {{ item.sportType.sportName }} / {{ item.sportType.product }}
              </p>
              <p class="table-custom__txt table-custom__txt--green">
                {{ item.sportType.betTypeName }} {{ item.sportType.note }}
              </p>
              <p class="table-custom__txt table-custom__txt--yellow">
                {{ item.sportType.homeTeam }}  vs  {{ item.sportType.awayTeam }}
              </p>
              <p class="table-custom__txt table-custom__txt--black">
                {{ item.sportType.leagueName }}
              </p>
            </div>
            <div v-else-if="item.sportType.sportType === 55">
              <p class="table-custom__txt table-custom__txt--bb">
                Cược Tài Chính
              </p>
              <p class="table-custom__txt table-custom__txt--green">
                {{ item.sportType.note }}
              </p>
              <p class="table-custom__txt table-custom__txt--yellow">
                {{ !item.sportType.betTypeName ? item.sportType.sportName : item.sportType.betTypeName }}
              </p>
              <p class="table-custom__txt table-custom__txt--black">
                {{ item.sportType.leagueName }}
              </p>
            </div>
            <div v-else-if="item.sportType.sportType === 245">
              <p class="table-custom__txt table-custom__txt--bb">
                Trò chơi ảo
              </p>
            </div>
            <div v-else>
              <p v-if="item.sportType.sportName && item.sportType.product" class="table-custom__txt table-custom__txt--bb">
                {{ item.sportType.sportName }} / {{ item.sportType.product }}
              </p>
              <p class="table-custom__txt table-custom__txt--green">
                {{ item.sportType.note }}
              </p>
              <p class="table-custom__txt table-custom__txt--yellow">
                {{ !item.sportType.betTypeName ? item.sportType.sportName : item.sportType.betTypeName }}
              </p>
              <p class="table-custom__txt table-custom__txt--black">
                {{ item.sportType.leagueName }}
              </p>
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
      <div v-else class="history-betting__no-content">
        Không có dữ liệu để hiển thị
      </div>
      <div class="history-betting__pagination">
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
import HistoryBetting from '~/mixins/account/history-betting'
import globalMixin from '~/mixins/global-mixin'
import Pagination from '~common/pagination'
import { MODAL } from '~/config/constant'

export default {
  components: {
    HistoryFilters,
    HistoryItem,
    Pagination
  },
  mixins: [globalMixin, HistoryBetting],
  data () {
    return {
      config: {
        id: MODAL.HISTORY_BETTING,
        class: 'modal--type1'
      }
    }
  }
}
</script>

<style lang="scss" scoped src="~scssAsset/account/sp/history-betting.scss"></style>
