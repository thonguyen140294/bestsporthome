<template>
  <div class="history-betting" :class="{'loading' : isLoading}">
    <div class="history-betting__top">
      <HistoryFilters :filters="filters" :startdate="dateRange.startDate" @eventClick="handleSearch" />
    </div>
    <div class="history-betting__bot">
      <HistoryTable :headers="headers" :items="betHistoryList" :fields="fields" :loading-button="isLoading">
        <template #sportType="{ data }">
          <div v-if="data.sportType === 1">
            <p v-if="data.sportName && data.product" class="table-custom__txt table-custom__txt--bb">
              {{ data.sportName }} / {{ data.product }}
            </p>
            <p class="table-custom__txt table-custom__txt--green">
              {{ data.betTypeName }} {{ data.note }}
            </p>
            <p class="table-custom__txt table-custom__txt--yellow">
              {{ data.homeTeam }}  vs  {{ data.awayTeam }}
            </p>
            <p class="table-custom__txt table-custom__txt--black">
              {{ data.leagueName }}
            </p>
          </div>
          <div v-else-if="data.sportType === 55">
            <p class="table-custom__txt table-custom__txt--bb">
              Cược Tài Chính
            </p>
            <p class="table-custom__txt table-custom__txt--green">
              {{ data.note }}
            </p>
            <p class="table-custom__txt table-custom__txt--yellow">
              {{ !data.betTypeName ? data.sportName : data.betTypeName }}
            </p>
            <p class="table-custom__txt table-custom__txt--black">
              {{ data.leagueName }}
            </p>
          </div>
          <div v-else-if="data.sportType === 245">
            <p class="table-custom__txt table-custom__txt--bb">
              Trò chơi ảo
            </p>
          </div>
          <div v-else>
            <p v-if="data.sportName && data.product" class="table-custom__txt table-custom__txt--bb">
              {{ data.sportName }} / {{ data.product }}
            </p>
            <p class="table-custom__txt table-custom__txt--green">
              {{ data.note }}
            </p>
            <p class="table-custom__txt table-custom__txt--yellow">
              {{ !data.betTypeName ? data.sportName : data.betTypeName }}
            </p>
            <p class="table-custom__txt table-custom__txt--black">
              {{ data.leagueName }}
            </p>
          </div>
        </template>
        <template #status="{ data }">
          <span :class="data.statusClass">
            {{ data.statusText }}
          </span>
        </template>
      </HistoryTable>
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
import HistoryBetting from '~/mixins/account/history-betting'
import globalMixin from '~/mixins/global-mixin'
import HistoryTable from '~common/history-table'
import Pagination from '~common/pagination'

export default {
  components: {
    HistoryFilters,
    HistoryTable,
    Pagination
  },
  mixins: [globalMixin, HistoryBetting]
}
</script>

<style lang="scss" scoped src="~scssAsset/account/history-betting.scss"></style>
