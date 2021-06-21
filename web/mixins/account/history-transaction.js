import get from 'lodash/get'
import dayjs from 'dayjs'
import slice from 'lodash/slice'
import { SHORT_DATE_FORMAT, DATE_FORMAT, FULL_DATE_FORMAT, PHONE_CARD_FEE } from '~/config/constant'
import ACCOUNT_API from '~/api/account'

export default {
  data () {
    return {
      total: 0,
      showPerPage: 10,
      currentPage: 1,
      resetPage: false,
      status: 'FINISHED,PENDING,CANCEL,PROCESSING,SMART_PAY_PROCESSING,PHONE_CARD_PROCESSING,MOMO_PROCESSING',
      headers: ['Thời gian', 'loại', 'Ngân hàng', 'hình thức', 'số tiền', 'mã GD', 'Ghi chú', 'Trạng thái'],
      fields: ['timeArr', 'action', 'toBankCode', 'type', 'amount', 'bankTransactionCode', 'transactionNote', 'status'],
      filters: {
        'FINISHED,PENDING,CANCEL,PROCESSING,SMART_PAY_PROCESSING,PHONE_CARD_PROCESSING,MOMO_PROCESSING,APPROVED': 'Tất cả',
        FINISHED: 'thành công',
        'PENDING,PROCESSING,SMART_PAY_PROCESSING,PHONE_CARD_PROCESSING,MOMO_PROCESSING': 'đang xử lý',
        APPROVED: 'đang chuyển',
        CANCEL: 'thất bại'
      },
      depositMethods: {
        atm: 'ATM',
        banking: 'Internet Banking',
        taiquay: 'Tại quầy',
        phone_card: 'Thẻ cào',
        smartpay: 'Paywin',
        momo: 'Momo'
      },
      bankCodeMapping: {
        VCB: 'VCB',
        ACB: 'ACB',
        DongA: 'DongA',
        VietinBank: 'VietinBank',
        BIDV: 'BIDV',
        Sacombank: 'Sacombank',
        Techcombank: 'Techcombank'
      },
      historyList: [],
      isLoading: false,
      dateRange: {
        startDate: new Date(),
        endDate: new Date()
      },
      DATE_FORMAT
    }
  },
  methods: {
    isIgnoredDisplay (i) {
      return !((i.partner_code === 'VinGaming' && i.type !== 'PROMOTION') ||
        (i.partner_code === 'System' && i.type === 'TRANSFER'))
    },
    async getTransactionData (playload) {
      try {
        this.isLoading = true
        const { data: response } = await this.$axios.get(ACCOUNT_API.TRANSACTION_HISTORY, {
          params: playload
        })
        const data = response && response.data.filter(i => this.isIgnoredDisplay(i))
        const start = ((this.showPerPage * this.currentPage) - this.showPerPage)
        const end = (this.showPerPage * this.currentPage)
        const historyList = this.formatData(data)
        this.historyList = slice(historyList, start, end)
        this.isLoading = false
        this.total = historyList.length
      } catch (e) {
        this.historyList = []
        this.isLoading = false
      }
    },
    formatData (data) {
      if (!data || data.length === 0) {
        return []
      }

      return data.map((i) => {
        const displayTransaction = {}
        displayTransaction.id = i.id
        displayTransaction.action = i.action
        let type = ''
        switch (i.type) {
          case 'PROMOTION':
          case 'COMMISSION':
            type = 'Khuyến Mãi'
            i.note = ''
            break
          case 'PROMOTION_CANCEL':
            type = 'Hủy Khuyến Mãi'
            break
          case 'PAYMENT':
            type = this.depositMethods[i.method]
            if (i.action === 'WITHDRAW') {
              type = !type ? 'Rút ngân hàng' : 'Rút thẻ cào'
            }
            break
          default:
            break
        }
        displayTransaction.type = type
        displayTransaction.toBankCode = i.to_bank_code

        if (i.method === 'smartpay') {
          const bankCode = get(i, 'to_bank_code', '')
          displayTransaction.toBankCode = this.bankCodeMapping[bankCode]
        }
        if (i.method === 'phone_card') {
          displayTransaction.toBankCode = i.card_provider
        }
        displayTransaction.timeArr = dayjs.utc(i.created_time, FULL_DATE_FORMAT).local().format('HH:mm DD/MM/YYYY')
        let transNote = get(i, 'note', '')
        displayTransaction.amount = i.amount
        if (i.method === 'phone_card') {
          if (i.action === 'WITHDRAW' && i.card_serial) {
            const listCard = JSON.parse(i.card_serial)
            listCard.forEach((card) => {
              transNote += `Nhà mạng: ${i.card_provider}, Số Seri thẻ: ${card.serial}, Mã thẻ (PIN): ${card.pincode}.`
            })
          }
          displayTransaction.amount = this.handleCardAmount(i.card_amount, i.status !== 'FINISHED' || i.card_provider)
        }
        displayTransaction.transactionNote = transNote

        let statusText = ''
        let statusClass = ''
        switch (i.status) {
          case 'FINISHED':
            statusText = 'Thành Công'
            statusClass = 'success'
            break
          case 'CANCEL':
            statusText = 'Thất bại'
            statusClass = 'fail'
            break
          case 'PENDING':
            statusText = 'Đang xử lý'
            statusClass = 'pending'
            break
          case 'PROCESSING':
          case 'SMART_PAY_PROCESSING':
          case 'PHONE_CARD_PROCESSING':
          case 'MOMO_PROCESSING':
            statusText = 'Đang Xử Lý'
            statusClass = 'pending'
            break
          case 'APPROVED':
            statusText = 'Đang chuyển'
            statusClass = 'pending'
        }
        displayTransaction.status = { statusText, statusClass }
        displayTransaction.bankTransactionCode = get(i, 'bank_trancode', '')

        return displayTransaction
      })
    },
    handleTransaction () {
      const playLoad = {
        from_date: dayjs(this.dateRange.startDate).format(SHORT_DATE_FORMAT),
        to_date: dayjs(this.dateRange.endDate).format(SHORT_DATE_FORMAT),
        status: this.status,
        limit: 1000000,
        page: 1
      }
      this.getTransactionData(playLoad)
    },
    handleSearch (data) {
      this.resetPage = true
      this.currentPage = 1
      this.dateRange.startDate = data.dateRange.startDate
      this.dateRange.endDate = data.dateRange.endDate
      this.status = data.active

      this.handleTransaction()
    },
    handlePage (data) {
      this.resetPage = false
      this.currentPage = data

      this.handleTransaction()
    },
    handleCardAmount (amount, provider) {
      return amount * (100 - (PHONE_CARD_FEE[provider] || 0)) / 100
    }
  },
  mounted () {
    this.handleTransaction()
  }
}
