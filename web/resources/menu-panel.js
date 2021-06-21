import { LOBBY_GAME_URLS, IFRAME_GAME_URLS, CASINO_URLS } from '@/config/page-url'

export const gameCenterSection = [
  {
    title: 'Ingame',
    link: LOBBY_GAME_URLS.INGAME,
    imgSrc: require('~imageAsset/layouts/menu-panel/game-center-item/ingame.svg'),
    label: '',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Bắn Cá',
    link: LOBBY_GAME_URLS.FISHING,
    imgSrc: require('~imageAsset/layouts/menu-panel/game-center-item/fishing.svg'),
    label: 'hot',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Jackpots',
    link: LOBBY_GAME_URLS.JACKPOTS,
    imgSrc: require('~imageAsset/layouts/menu-panel/game-center-item/jackpots.svg'),
    label: '',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Slots',
    link: LOBBY_GAME_URLS.SLOT,
    imgSrc: require('~imageAsset/layouts/menu-panel/game-center-item/slots.svg'),
    label: '',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Virtual Sports',
    link: IFRAME_GAME_URLS.VIRTUAL_SPORTS,
    imgSrc: require('~imageAsset/layouts/menu-panel/game-center-item/virtual-sport.svg'),
    label: '',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Lô Đề',
    link: LOBBY_GAME_URLS.LODE,
    imgSrc: require('~imageAsset/layouts/menu-panel/game-center-item/lode.svg'),
    label: 'new',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Instant Games',
    link: LOBBY_GAME_URLS.INSTANT_GAMES,
    imgSrc: require('~imageAsset/layouts/menu-panel/game-center-item/spribe.svg'),
    label: '',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Quay Số',
    link: LOBBY_GAME_URLS.LOTTERY,
    imgSrc: require('~imageAsset/layouts/menu-panel/game-center-item/quay-so.svg'),
    label: '',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Keno',
    link: IFRAME_GAME_URLS.KENO,
    imgSrc: require('~imageAsset/layouts/menu-panel/game-center-item/keno.svg'),
    label: '',
    loginRequired: true,
    newTab: false
  }
]

export const casinoSection = [
  {
    title: 'Poker',
    link: CASINO_URLS.POKER,
    imgSrc: require('~imageAsset/layouts/menu-panel/casino-item/poker.svg'),
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Baccarat',
    link: CASINO_URLS.BACCARAT,
    imgSrc: require('~imageAsset/layouts/menu-panel/casino-item/baccarat.svg'),
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Roulette',
    link: CASINO_URLS.ROULETTE,
    imgSrc: require('~imageAsset/layouts/menu-panel/casino-item/roulette.svg'),
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Blackjack',
    link: CASINO_URLS.BLACKJACK,
    imgSrc: require('~imageAsset/layouts/menu-panel/casino-item/blackjack.svg'),
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Game Shows',
    link: CASINO_URLS.GAMESHOW,
    imgSrc: require('~imageAsset/layouts/menu-panel/casino-item/game-show.svg'),
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Table Games',
    link: CASINO_URLS.TABLE_GAME,
    imgSrc: require('~imageAsset/layouts/menu-panel/casino-item/table-game.svg'),
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Dragon Tiger',
    link: CASINO_URLS.DRAGON_AND_TIGER,
    imgSrc: require('~imageAsset/layouts/menu-panel/casino-item/dragontiger.svg'),
    loginRequired: false,
    newTab: false
  }
]

export const guideSection = [
  {
    title: 'Tin tức',
    link: '/tin-tuc',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Về chúng tôi',
    link: '/ve-chung-toi',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Điều khoản & điều kiện',
    link: '/ve-chung-toi?tab=dieu-khoan-dieu-kien',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Chính sách bảo mật',
    link: '/ve-chung-toi?tab=chinh-sach-bao-mat',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Khuyến mãi',
    link: '/ve-chung-toi?tab=khuyen-mai',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Phương thức thanh toán',
    link: '/ve-chung-toi?tab=phuong-thuc-thanh-toan',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Câu hỏi thường gặp',
    link: '/faq',
    loginRequired: false,
    newTab: false
  },
  {
    title: 'Liên hệ',
    link: '/lien-he',
    loginRequired: false,
    newTab: false
  }
]
