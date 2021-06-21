import { LOBBY_GAME_MENU_URLS } from '@/config/page-url'

export const gameMenu = {
  allgame: {
    title: 'Tổng Quan',
    url: LOBBY_GAME_MENU_URLS.ALL,
    gameQuery: 'allgame'
  },
  hotgame: {
    title: 'Hot Games',
    url: LOBBY_GAME_MENU_URLS.HOTGAME,
    gameQuery: 'hotgame'
  },
  gamebai: {
    title: 'Game Bài',
    url: LOBBY_GAME_MENU_URLS.GAME_BAI,
    gameQuery: 'gamebai',
    label: 'hot'
  },
  table_games: {
    title: 'Table Games',
    url: LOBBY_GAME_MENU_URLS.TABLE_GAMES,
    gameQuery: 'table_games',
    label: 'new'
  },
  quickgame: {
    title: 'Quick Games',
    url: LOBBY_GAME_MENU_URLS.QUICKGAME,
    gameQuery: 'quickgame'
  },
  jackpots: {
    title: 'Jackpots',
    url: LOBBY_GAME_MENU_URLS.JACKPOTS,
    gameQuery: 'jackpots'
  },
  slot: {
    title: 'Slots',
    url: LOBBY_GAME_MENU_URLS.SLOT,
    gameQuery: 'slot'
  },
  fishing: {
    title: 'Bắn Cá',
    url: LOBBY_GAME_MENU_URLS.FISHING,
    gameQuery: 'fishing'
  },
  lottery: {
    title: 'Quay Số',
    url: LOBBY_GAME_MENU_URLS.LOTTERY,
    gameQuery: 'lottery'
  },
  ingame: {
    title: 'InGame',
    url: LOBBY_GAME_MENU_URLS.INGAME,
    gameQuery: 'ingame'
  },
  instant_games: {
    title: 'Instant Games',
    url: LOBBY_GAME_MENU_URLS.INSTANT_GAMES,
    gameQuery: 'instant_games'
  },
  lode: {
    title: 'Lô Đề',
    url: LOBBY_GAME_MENU_URLS.LODE,
    gameQuery: 'lode'
  },
  battle_games: {
    title: 'Battle Games',
    url: LOBBY_GAME_MENU_URLS.BATTLE_GAMES,
    gameQuery: 'battle_games'
  }
}
