import { MODAL } from '~/config/constant'

export const bottomBar = [
  {
    id: 'menu',
    link: '',
    title: 'Menu',
    imgSrc: require('~imageAsset/common/bottom-bar/menu.svg'),
    alt: 'Menu',
    modalId: MODAL.NAVIGATION,
    showLogin: true,
    showNotLogin: true,
    newTab: false
  },
  {
    id: 'sports',
    link: '/live-sports',
    title: 'Thể thao',
    imgSrc: require('~imageAsset/common/bottom-bar/sport.svg'),
    alt: 'Thể thao',
    modalId: '',
    showLogin: true,
    showNotLogin: true,
    newTab: true,
    mainWallet: true
  },
  {
    id: 'promotion',
    link: '/ve-chung-toi?tab=khuyen-mai',
    title: 'Khuyến mãi',
    imgSrc: require('~imageAsset/common/bottom-bar/promotion.svg'),
    alt: 'Khuyến mãi',
    modalId: '',
    showLogin: false,
    showNotLogin: true,
    newTab: false
  },
  {
    id: 'deposit',
    link: '/account?tab=deposit',
    title: 'Nạp tiền',
    imgSrc: require('~imageAsset/common/bottom-bar/deposit.svg'),
    alt: 'Nạp tiền',
    modalId: '',
    showLogin: true,
    showNotLogin: false,
    newTab: false,
    mainWallet: true
  },
  {
    id: 'wallet',
    title: 'Chuyển ví',
    imgSrc: require('~imageAsset/common/bottom-bar/transfer.svg'),
    alt: 'Chuyển ví',
    modalId: MODAL.TRANSFER_WALLET,
    showLogin: true,
    showNotLogin: false,
    newTab: false
  },
  {
    id: 'support',
    link: 'https://secure.livechatinc.com/licence/12785688/v2/open_chat.cgi',
    title: 'Live chat',
    imgSrc: require('~imageAsset/common/bottom-bar/live-chat.svg'),
    alt: 'Hỗ trợ',
    modalId: '',
    showLogin: true,
    showNotLogin: true,
    newTab: true
  }
]
