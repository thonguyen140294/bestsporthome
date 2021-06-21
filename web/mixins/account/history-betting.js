import get from 'lodash/get'
import dayjs from 'dayjs'
import { FULL_DATE_FORMAT, DATE_FORMAT, SHORT_DATE_FORMAT } from '~/config/constant'
import { roundFloatNumber } from '~/helper/index'
import ACCOUNT_API from '~/api/account'

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
        RUNNING: 'đang chờ',
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
      betHistoryList: [],
      subWalletHistoryList: [],
      isLoading: false
    }
  },
  methods: {
    async getBetHistory (playload) {
      try {
        this.isLoading = true
        const { data: response } = await this.$axios.get(ACCOUNT_API.TRANSACTION_GAME, {
          params: playload
        })
        this.betHistoryList = this.formatBetHistoryData(response.data)
        this.isLoading = false
        this.total = response.total || 0
      } catch (e) {
        this.betHistoryList = []
        this.isLoading = false
      }
    },
    formatBetHistoryData (data) {
      if (!data || data.length === 0) {
        return []
      }

      return data.map((i) => {
        const sportType = i.sport_type
        const sportName = i.sport_name
        const product = i.product
        const betTypeName = i.bet_type_name
        const note = i.note
        const homeTeam = i.home_txt
        const awayTeam = i.away_txt
        const leagueName = i.league_name

        const displayHistory = {
          sportType: {
            sportType,
            sportName,
            product,
            betTypeName,
            note,
            homeTeam,
            awayTeam,
            leagueName
          },
          transId: i.trans_id,
          stake: `${this.$options.filters.formatAmountUnit(roundFloatNumber(i.stake, 1), 1)} Đ`,
          timeArr: dayjs.utc(i.created_time, FULL_DATE_FORMAT).local().format('HH:mm DD/MM/YYYY'),
          bonus: `${get(i, 'commission', 0)} Đ`
        }
        displayHistory.winLostText = roundFloatNumber(i.winlost_amount, 1) > 0
          ? `+${this.$options.filters.formatAmountUnit(roundFloatNumber(i.winlost_amount, 1), 1)} Đ`
          : `${this.$options.filters.formatAmountUnit(roundFloatNumber(i.winlost_amount, 1), 1)} Đ`

        let statusText = ''
        let statusClass = ''
        switch (i.ticket_status) {
          case 'lose':
            statusText = 'Thua'
            statusClass = 'fail'
            break
          case 'won':
            statusText = 'Thắng'
            statusClass = 'success'
            break
          case 'draw':
            statusText = 'Hòa'
            statusClass = 'draw'
            break
          case 'running':
            statusText = 'Đang chờ'
            statusClass = 'pending'
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
    handleBetting () {
      const playLoad = {
        from_date: dayjs(this.dateRange.startDate).format(SHORT_DATE_FORMAT),
        to_date: dayjs(this.dateRange.endDate).format(SHORT_DATE_FORMAT),
        status: this.status || null,
        limit: this.showPerPage,
        page: this.currentPage
      }
      this.getBetHistory(playLoad)
    },
    handleSearch (data) {
      this.resetPage = true
      this.currentPage = 1
      this.dateRange.startDate = data.dateRange.startDate
      this.dateRange.endDate = data.dateRange.endDate
      this.status = data.active

      this.handleBetting()
    },
    handlePage (data) {
      this.resetPage = false
      this.currentPage = data

      this.handleBetting()
    }

  },
  mounted () {
    this.handleBetting()
  }
}
