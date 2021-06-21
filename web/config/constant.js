export const SHORT_DATE_FORMAT = 'DD-MM-YYYY'
export const DATE_FORMAT = 'DD/MM/YYYY'
export const FULL_DATE_FORMAT = 'DD-MM-YYYY HH:mm:ss'

export const WALLET = {
  MAIN: 'MAIN_WALLET',
  SUB: 'SUB_WALLET',
  ALL: 'all'
}

export const MODAL = {
  LOGIN: 'modalLogin',
  REGISTER: 'modalRegister',
  FORGOT_PASSWORD: 'modalForgotPassword',
  ACCOUNT: 'modalAccount',
  AVATAR: 'modalAvatar',
  NAVIGATION: 'modalNavigation',
  HISTORY_TRANSACTION: 'modalHistoryTransaction',
  HISTORY_BETTING: 'modalHistoryBetting',
  HISTORY_SPORTS: 'modalHistorySports',
  TRANSFER_WALLET: 'modalTransferWallet',
  WELCOME: 'modalWelcome',
  PROMOTION_PACKAGE: 'modalPackage'
}

export const MODAL_PANEL = [MODAL.LOGIN, MODAL.REGISTER, MODAL.FORGOT_PASSWORD, MODAL.NAVIGATION, MODAL.TRANSFER_WALLET]

export const MODAL_CLOSE = [MODAL.LOGIN, MODAL.REGISTER, MODAL.FORGOT_PASSWORD]

export const ICON_ERROR = {
  warning: 'warning',
  error: 'error',
  success: 'success',
  info: 'info',
  connect: require('~imageRoot/alerts/connect.svg'),
  money: require('~imageRoot/alerts/money.svg'),
  promotion: require('~imageRoot/alerts/promotion.svg'),
  notify: require('~imageRoot/alerts/notify.svg'),
  casino: require('~imageRoot/alerts/casino.svg'),
  dollar: require('~imageRoot/alerts/dollar.svg')
}

export const PROMOTION_PLAN_TYPE = {
  COMMISSION: 1,
  WELCOME: 2,
  PROMOTION: 4,
  BONUS: 6
}

export const DATETIME_FORMAT = {
  MAINTENANCE_FORMAT: 'HH:mm - DD/MM/YYYY'
}

export const REGEX_EMAIL = /(?=.*^[0-9a-zA-Z@.]+$)(?=.*^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$).*/

export const PHONE_CARD_FEE = {
  VIETTEL: 32,
  MOBIFONE: 33,
  VINAPHONE: 34
}

export const AVATAR_ICON = {
  WARNING: require('~imageRoot/components/account/info-my-bank/warning.svg'),
  SUCCESS: require('~imageRoot/components/account/info-my-bank/success.svg')
}
