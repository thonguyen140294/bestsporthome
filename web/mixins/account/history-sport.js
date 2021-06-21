import get from 'lodash/get'
import dayjs from 'dayjs'
import { DATE_FORMAT, SHORT_DATE_FORMAT } from '~/config/constant'
import { roundFloatNumber } from '~/helper/index'
import ACCOUNT_API from '~/api/account'
import { formatDateTimeWithTimezone } from '~/helper'

export default {
  data () {
    return {
      total: 0,
      showPerPage: 10,
      currentPage: 1,
      resetPage: false,
      status: '',
      headers: ['Thời gian', 'Mã SỐ', 'LOẠI', 'Số tiền', 'THẮNG/THUA', 'THƯỞNG', 'Trạng thái'],
      fields: ['timeArr', 'transId', 'sportType', 'stake', 'winLostText', 'bonus', 'status'],
      filters: {
        '': 'Tất cả',
        'WIN,WON,half win,half won': 'thắng',
        DRAW: 'Hòa',
        'LOSE,half lose': 'thua',
        'RUNNING,RUNING': 'đang chờ',
        REFUND: 'hủy'
      },
      dateRange: {
        startDate: new Date((new Date()).getTime() - (14 * 24 * 60 * 60 * 1000)),
        endDate: new Date()
      },
      tabIndex: 0,
      DATE_FORMAT,
      depositMethods: {
        atm: 'ATM',
        banking: 'Internet Banking',
        taiquay: 'Tại quầy',
        phone_card: 'Thẻ cào',
        smartpay: 'Paywin'
      },
      bankCodeMapping: {
        vcb: 'VCB',
        acb: 'ACB',
        eab: 'DongA',
        vtb: 'VietinBank',
        bidv: 'BIDV',
        sab: 'Sacombank',
        tcb: 'Techcombank'
      },
      sportHistoryList: [],
      isLoading: false
    }
  },
  methods: {
    async getSportHistory (playload) {
      try {
        this.isLoading = true
        const { data: response } = await this.$axios.get(ACCOUNT_API.TRANSACTION_PSPORT, {
          params: playload
        })
        this.sportHistoryList = this.formatSportHistoryData(response.data)
        this.isLoading = false
        this.total = response.total || 0
      } catch (e) {
        this.sportHistoryList = []
        this.isLoading = false
      }
    },
    formatSportHistoryData (data) {
      if (!data || data.length === 0) {
        return []
      }

      return data.map((i) => {
        const product = `${i.sport_name}/${i.product}`
        const betTypeName = i.bet_type_name
        const homeName = i.home_name
        const awayName = i.away_name
        const note = i.note
        const leagueName = i.league_name

        const displayHistory = {
          sportType: {
            product,
            betTypeName,
            homeName,
            awayName,
            note,
            leagueName
          },
          id: i.id,
          transId: i.id,
          stake: `${this.$options.filters.formatAmountUnit(roundFloatNumber(i.stake, 1), 1)} Đ`,
          timeArr: formatDateTimeWithTimezone(i.created_time),
          bonus: `${get(i, 'bonus', 0)} Đ`,
          winLostText: roundFloatNumber(i.winlost, 1) > 0
            ? `+${this.$options.filters.formatAmountUnit(roundFloatNumber(i.winlost, 1), 1)} Đ`
            : `${this.$options.filters.formatAmountUnit(roundFloatNumber(i.winlost, 1), 1)} Đ`
        }

        let statusText = ''
        let statusClass = ''
        switch (i.ticket_status) {
          case 'LOSE':
            statusText = 'Thua'
            statusClass = 'fail'
            break
          case 'WIN':
            statusText = 'Thắng'
            statusClass = 'success'
            break
          case 'RUNNING':
          case 'RUNING':
            statusText = 'Đang chờ'
            statusClass = 'pending'
            break
          case 'DRAW':
            statusText = 'Hòa'
            statusClass = 'draw'
            break
          case 'half lose':
            statusText = 'Thua một nửa'
            statusClass = 'fail'
            break
          case 'half win':
            statusText = 'Thắng một nửa'
            statusClass = 'success'
            break
          case 'half won':
            statusText = 'Thắng một nửa'
            statusClass = 'success'
            break
          case 'refund':
            statusText = 'Hủy'
            statusClass = 'draw'
        }
        displayHistory.status = { statusText, statusClass }

        return displayHistory
      })
    },
    upperFirstLetter (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    handleSport () {
      const playLoad = {
        from_date: dayjs(this.dateRange.startDate).format(SHORT_DATE_FORMAT),
        to_date: dayjs(this.dateRange.endDate).format(SHORT_DATE_FORMAT),
        status: this.status || null,
        limit: this.showPerPage,
        page: this.currentPage
      }
      this.getSportHistory(playLoad)
    },
    handleSearch (data) {
      this.resetPage = true
      this.currentPage = 1
      this.dateRange.startDate = data.dateRange.startDate
      this.dateRange.endDate = data.dateRange.endDate
      this.status = data.active

      this.handleSport()
    },
    handlePage (data) {
      this.resetPage = false
      this.currentPage = data

      this.handleSport()
    }
  },
  mounted () {
    this.handleSport()
  }
}
