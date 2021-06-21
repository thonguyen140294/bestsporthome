import { CASINO_MENU_URLS } from '@/config/page-url'

export const casinoMenu = {
  allgame: {
    title: 'Tổng Quan',
    url: CASINO_MENU_URLS.ALL,
    gameQuery: 'allgame'
  },
  hotgame: {
    title: 'Hot Games',
    url: CASINO_MENU_URLS.HOTGAME,
    gameQuery: 'hotgame'
  },
  tablegame: {
    title: 'Table Games',
    url: CASINO_MENU_URLS.TABLE_GAME,
    gameQuery: 'tablegame',
    label: 'hot'
  },
  baccarat: {
    title: 'Baccarat',
    url: CASINO_MENU_URLS.BACCARAT,
    gameQuery: 'baccarat'
  },
  dragontiger: {
    title: 'Dragon & Tiger',
    url: CASINO_MENU_URLS.DRAGON_AND_TIGER,
    gameQuery: 'dragontiger'
  },
  roulette: {
    title: 'Roulette',
    url: CASINO_MENU_URLS.ROULETTE,
    gameQuery: 'roulette'
  },
  blackjack: {
    title: 'Blackjack',
    url: CASINO_MENU_URLS.BLACKJACK,
    gameQuery: 'blackjack'
  },
  poker: {
    title: 'Poker',
    url: CASINO_MENU_URLS.POKER,
    gameQuery: 'poker'
  },
  gameshow: {
    title: 'Game Shows',
    url: CASINO_MENU_URLS.GAMESHOW,
    gameQuery: 'gameshow'
  }
}
