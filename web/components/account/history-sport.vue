<template>
  <div class="history-sport" :class="{'loading' : isLoading}">
    <div class="history-sport__top">
      <HistoryFilters :filters="filters" :startdate="dateRange.startDate" @eventClick="handleSearch" />
    </div>
    <div class="history-sport__bot">
      <HistoryTable :headers="headers" :items="sportHistoryList" :fields="fields" :loading-button="isLoading">
        <template #sportType="{ data }">
          <div v-if="data.product === 'sportbook'">
            <p class="table-custom__txt table-custom__txt--bb">
              {{ data.product }}
            </p>
            <p class="table-custom__txt table-custom__txt--green">
              {{ data.betTypeName }} {{ data.note }}
            </p>
            <p class="table-custom__txt table-custom__txt--yellow">
              {{ data.homeName }} vs ${{ data.awayName }}
            </p>
            <p class="table-custom__txt table-custom__txt--black">
              {{ data.leagueName }}
            </p>
          </div>
          <div v-else>
            {{ data.product }}
          </div>
        </template>
        <template #status="{ data }">
          <span :class="data.statusClass">
            {{ data.statusText }}
          </span>
        </template>
      </HistoryTable>
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
import HistorySport from '~/mixins/account/history-sport'
import globalMixin from '~/mixins/global-mixin'
import HistoryTable from '~common/history-table'
import Pagination from '~common/pagination'

export default {
  components: {
    HistoryFilters,
    HistoryTable,
    Pagination
  },
  mixins: [globalMixin, HistorySport]
}
</script>

<style lang="scss" scoped src="~scssAsset/account/history-sport.scss"></style>
