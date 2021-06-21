const ACCOUNT_API = {
  BANK_LIST: '/transaction/bank-list',
  USER_BANKS: '/users/banks',
  MOMO_LIST: 'transaction/momo-list',
  BANK_ACCOUNT: '/transaction/bank-account',
  PROMOTION_PACKAGE: '/transaction/package-list',
  DEPOSIT_BANK: '/transaction/add-invoice',
  DEPOSIT_PAYWIN: '/transaction/add-invoice-smartpay',
  DEPOSIT_MOMO: '/transaction/add-invoice-momo',
  DEPOSIT_CARD: '/transaction/add-invoice-phone-card',
  WITHDRAW_BANK: '/transaction/add-invoice-withdraw',
  WITHDRAW_CARD: '/transaction/add-invoice-withdraw-phone',
  TRANSACTION_HISTORY: '/transaction/history',
  TRANSACTION_GAME: '/transaction/history-bet',
  TRANSACTION_PSPORT: '/transaction/history-g',
  TRANSFER_WALLET: '/wallet/transfer'
}

module.exports = ACCOUNT_API
