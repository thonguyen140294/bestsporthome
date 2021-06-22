import { LOBBY_GAME_URLS, IFRAME_GAME_URLS } from '@/config/page-url'
import { WALLET } from '@/config/constant'

const { INSTANT_GAMES, SLOT, JACKPOTS, FISHING, LOTTERY, INGAME, QUICKGAME } = LOBBY_GAME_URLS
const { LODE, LODE_SIEUTOC, LOTTERY_CYBER_PUNK, LOTTERY_LAS_VEGAS } = IFRAME_GAME_URLS

export const sportCenter = {
  all: {
    items: [
      {
        title: 'Câu lạc bộ',
        imgSrc: require('~imageAsset/lobby/game-center-item/arge-h-21.jpg'),
        loginRequired: false,
        newTab: false,
        promotionPrevent: false,
        gameUrl: QUICKGAME
      },
      {
        title: 'Quốc gia',
        imgSrc: require('~imageAsset/lobby/game-center-item/arge-h-21.jpg'),
        loginRequired: false,
        newTab: false,
        promotionPrevent: false,
        gameUrl: JACKPOTS
      },
      {
        title: 'Áo khoác',
        imgSrc: require('~imageAsset/lobby/game-center-item/arge-h-21.jpg'),
        loginRequired: false,
        newTab: false,
        promotionPrevent: false,
        gameUrl: SLOT
      },
      {
        title: 'Áo pitch',
        imgSrc: require('~imageAsset/lobby/game-center-item/arge-h-21.jpg'),
        loginRequired: false,
        newTab: false,
        promotionPrevent: false,
        gameUrl: FISHING
      },
      {
        title: 'Giày',
        imgSrc: require('~imageAsset/lobby/game-center-item/arge-h-21.jpg'),
        loginRequired: false,
        newTab: false,
        promotionPrevent: false,
        gameUrl: LOTTERY
      },
      {
        title: 'Găng tay',
        imgSrc: require('~imageAsset/lobby/game-center-item/arge-h-21.jpg'),
        loginRequired: false,
        newTab: false,
        promotionPrevent: false,
        gameUrl: INGAME
      },
      {
        title: 'Balo',
        imgSrc: require('~imageAsset/lobby/game-center-item/arge-h-21.jpg'),
        loginRequired: false,
        newTab: false,
        promotionPrevent: false,
        gameUrl: INSTANT_GAMES
      }
    ]
  },
  jackpots: {
    items: [
      {
        title: 'Bắn Cá Hoàng Gia',
        imgSrc: require('~imageAsset/lobby/game-center-item/fishing/ban-ca-hoang-gia.png'),
        loginRequired: true,
        gameId: 'ktf_1999',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        feature: true,
        gameType: 'gp_url'
      },
      {
        title: 'Không lực hoàng gia',
        imgSrc: require('~imageAsset/lobby/game-center-item/fishing/khong-luc-hoang-gia.png'),
        loginRequired: true,
        gameId: 'ktf_1997',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Call Of War',
        imgSrc: require('~imageAsset/lobby/game-center-item/slot/call-of-war.png'),
        loginRequired: true,
        gameId: 'kts9979',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Metal Gear Solid',
        imgSrc: require('~imageAsset/lobby/game-center-item/slot/metal-gear-solid.png'),
        loginRequired: true,
        gameId: 'kts9977',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Aladdin',
        imgSrc: require('~imageAsset/lobby/game-center-item/slot/aladin.png'),
        loginRequired: true,
        gameId: 'kts9976',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Long Quy Chi Bảo',
        imgSrc: require('~imageAsset/lobby/game-center-item/slot/long-quy-chi-bao.png'),
        loginRequired: true,
        gameId: 'kts9980',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'The Witcher',
        imgSrc: require('~imageAsset/lobby/game-center-item/slot/the-witcher.png'),
        loginRequired: true,
        gameId: 'kts9985',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      }
    ],
    hasLobby: true
  },
  slot: {
    items: [
      {
        title: 'Call Of War',
        imgSrc: require('~imageAsset/lobby/game-center-item/slot/call-of-war.png'),
        loginRequired: true,
        gameId: 'kts9979',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Metal Gear Solid',
        imgSrc: require('~imageAsset/lobby/game-center-item/slot/metal-gear-solid.png'),
        loginRequired: true,
        gameId: 'kts9977',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Aladdin',
        imgSrc: require('~imageAsset/lobby/game-center-item/slot/aladin.png'),
        loginRequired: true,
        gameId: 'kts9976',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Long Quy Chi Bảo',
        imgSrc: require('~imageAsset/lobby/game-center-item/slot/long-quy-chi-bao.png'),
        loginRequired: true,
        gameId: 'kts9980',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'The Witcher',
        imgSrc: require('~imageAsset/lobby/game-center-item/slot/the-witcher.png'),
        loginRequired: true,
        gameId: 'kts9985',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Bí Mật Cleopatra',
        imgSrc: require('~imageAsset/lobby/game-center-item/slot/cleopatra.png'),
        loginRequired: true,
        gameId: 'kts9988',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Tứ Linh Thần Thú',
        imgSrc: require('~imageAsset/lobby/game-center-item/slot/tu-linh-than-thu.png'),
        loginRequired: true,
        gameId: 'kts9991',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      }
    ],
    hasLobby: true
  },
  fishing: {
    items: [
      {
        title: 'Bắn Cá Hoàng Gia',
        imgSrc: require('~imageAsset/lobby/game-center-item/fishing/ban-ca-hoang-gia.png'),
        loginRequired: true,
        gameId: 'ktf1999',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Bắn Cá Vui Nhộn',
        imgSrc: require('~imageAsset/lobby/game-center-item/fishing/ban-ca-vui-nhon.png'),
        loginRequired: true,
        apiUrl: '/games/cq9Url',
        gameId: 'AT05',
        provider: 'CQ9',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: ''
      },
      {
        title: 'Bắn Cá Tâm Tiễn',
        imgSrc: require('~imageAsset/lobby/game-center-item/fishing/ban-ca-tam-tien.png'),
        loginRequired: true,
        apiUrl: '/games/cq9Url',
        gameId: 'AT01',
        provider: 'CQ9',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: ''
      },
      {
        title: 'Bắn Cá Thủy Hử',
        imgSrc: require('~imageAsset/lobby/game-center-item/fishing/ban-ca-thuy-hu.png'),
        loginRequired: true,
        apiUrl: '/games/cq9Url',
        gameId: 'AT06',
        provider: 'CQ9',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: ''
      },
      {
        title: 'Thiên Đường Săn Cá',
        imgSrc: require('~imageAsset/lobby/game-center-item/fishing/thien-duong-san-ca.png'),
        loginRequired: true,
        apiUrl: '/games/cq9Url',
        gameId: 'AB3',
        provider: 'CQ9',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: ''
      }
    ],
    hasLobby: true
  },
  ingame: {
    items: [
      {
        title: 'Baccarat Super 6',
        imgSrc: require('~imageAsset/lobby/game-center-item/ingame/baccarat-super-6.png'),
        loginRequired: true,
        gameId: 'ktrng_3992',
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: true,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Long Lân Quy Phụng',
        imgSrc: require('~imageAsset/lobby/game-center-item/ingame/long-lan-quy-phung.png'),
        loginRequired: true,
        gameId: 'ktrng_3999',
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: true,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Sicbo Sảnh Rồng',
        imgSrc: require('~imageAsset/lobby/game-center-item/ingame/tai-xiu-song-long.png'),
        loginRequired: true,
        gameId: 'ktrng_3998',
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: true,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Baccarat Classic',
        imgSrc: require('~imageAsset/lobby/game-center-item/ingame/baccarat-classic.png'),
        loginRequired: true,
        gameId: 'ktrng_3997',
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: true,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Bull Bull',
        imgSrc: require('~imageAsset/lobby/game-center-item/ingame/bull-bull.png'),
        loginRequired: true,
        gameId: 'ktrng_3991',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: true,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      },
      {
        title: 'Roulette',
        imgSrc: require('~imageAsset/lobby/game-center-item/ingame/roulette.png'),
        loginRequired: true,
        gameId: 'ktrng_3994',
        jackpot: true,
        provider: 'Techplay',
        newTab: true,
        promotionPrevent: true,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      }
    ],
    hasLobby: true
  },
  lottery: {
    items: [
      {
        title: 'Quay Số CyberPunk',
        imgSrc: require('~imageAsset/lobby/game-center-item/lottery/quayso-cyber.png'),
        loginRequired: true,
        gameUrl: LOTTERY_CYBER_PUNK,
        provider: '',
        newTab: false,
        promotionPrevent: true,
        wallet: WALLET.SUB,
        gameType: ''
      },
      {
        title: 'Quay Số Las Vegas',
        imgSrc: require('~imageAsset/lobby/game-center-item/lottery/quayso-las-vegas.png'),
        loginRequired: true,
        gameUrl: LOTTERY_LAS_VEGAS,
        provider: '',
        newTab: false,
        promotionPrevent: true,
        wallet: WALLET.SUB,
        gameType: ''
      }
    ],
    hasLobby: false
  },
  instant_games: {
    items: [
      {
        title: 'Aviator',
        imgSrc: require('~imageAsset/lobby/game-center-item/spribe/aviator.png'),
        loginRequired: true,
        gameId: 'aviator',
        provider: 'Spribe Games',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'instant_games_url'
      },
      {
        title: 'Dice',
        imgSrc: require('~imageAsset/lobby/game-center-item/spribe/dice.png'),
        loginRequired: true,
        gameId: 'dice',
        provider: 'Spribe Games',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'instant_games_url'
      },
      {
        title: 'Goal',
        imgSrc: require('~imageAsset/lobby/game-center-item/spribe/goal.png'),
        loginRequired: true,
        gameId: 'goal',
        provider: 'Spribe Games',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'instant_games_url'
      },
      {
        title: 'Hilo',
        imgSrc: require('~imageAsset/lobby/game-center-item/spribe/hilo.png'),
        loginRequired: true,
        gameId: 'hi-lo',
        provider: 'Spribe Games',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'instant_games_url'
      },
      {
        title: 'Keno',
        imgSrc: require('~imageAsset/lobby/game-center-item/spribe/spribe_keno.png'),
        loginRequired: true,
        gameId: 'keno',
        provider: 'Spribe Games',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'instant_games_url'
      },
      {
        title: 'Mine',
        imgSrc: require('~imageAsset/lobby/game-center-item/spribe/mine.png'),
        loginRequired: true,
        gameId: 'mines',
        provider: 'Spribe Games',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'instant_games_url'
      },
      {
        title: 'Mini Roulette',
        imgSrc: require('~imageAsset/lobby/game-center-item/spribe/mini_roulette.png'),
        loginRequired: true,
        gameId: 'mini-roulette',
        provider: 'Spribe Games',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'instant_games_url'
      },
      {
        title: 'Plinko',
        imgSrc: require('~imageAsset/lobby/game-center-item/spribe/plinko.png'),
        loginRequired: true,
        gameId: 'plinko',
        provider: 'Spribe Games',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'instant_games_url'
      }
    ],
    hasLobby: true
  },
  lode: {
    items: [
      {
        title: 'Lô Đề 3 miền',
        imgSrc: require('~imageAsset/lobby/game-center-item/lode/lode3mien.png'),
        loginRequired: true,
        newTab: false,
        promotionPrevent: false,
        gameUrl: LODE,
        wallet: WALLET.SUB,
        gameType: ''
      },
      {
        title: 'Lô Đề Siêu Tốc',
        imgSrc: require('~imageAsset/lobby/game-center-item/lode/lo-de-sieu-toc.png'),
        loginRequired: true,
        newTab: false,
        promotionPrevent: false,
        gameUrl: LODE_SIEUTOC,
        wallet: WALLET.SUB,
        gameType: ''
      }
    ],
    hasLobby: false
  },
  quickgame: {
    items: [
      {
        title: 'Keno',
        imgSrc: require('~imageAsset/lobby/game-center-item/quickgame/keno.png'),
        loginRequired: true,
        gameUrl: '/keno',
        provider: '',
        newTab: false,
        promotionPrevent: false,
        wallet: WALLET.MAIN,
        gameType: 'keno_url'
      },
      {
        title: 'Lottery',
        imgSrc: require('~imageAsset/lobby/game-center-item/quickgame/lottery.png'),
        loginRequired: true,
        gameUrl: '/lottery',
        provider: '',
        newTab: false,
        promotionPrevent: false,
        wallet: WALLET.MAIN
      },
      {
        title: 'Numbers Game',
        imgSrc: require('~imageAsset/lobby/game-center-item/quickgame/numbersgame.png'),
        loginRequired: false,
        gameUrl: '/numbergame',
        provider: '',
        newTab: false,
        promotionPrevent: false,
        wallet: WALLET.MAIN
      },
      {
        title: 'Saba Games',
        imgSrc: require('~imageAsset/lobby/game-center-item/quickgame/saba.png'),
        loginRequired: true,
        gameUrl: '/saba-club',
        provider: '',
        newTab: false,
        promotionPrevent: false,
        wallet: WALLET.MAIN
      },
      {
        title: 'Table Games',
        imgSrc: require('~imageAsset/lobby/game-center-item/quickgame/tablegame.png'),
        loginRequired: true,
        gameUrl: '/tablegame',
        provider: '',
        newTab: false,
        promotionPrevent: false,
        wallet: WALLET.MAIN
      },
      {
        title: 'Virtual Games',
        imgSrc: require('~imageAsset/lobby/game-center-item/quickgame/virtualgame.png'),
        loginRequired: true,
        gameUrl: '/virtualgame',
        provider: '',
        newTab: false,
        promotionPrevent: false,
        wallet: WALLET.MAIN
      },
      {
        title: 'Keno TP',
        imgSrc: require('~imageAsset/lobby/game-center-item/quickgame/keno-tp.png'),
        loginRequired: true,
        gameUrl: '/tp-keno',
        provider: '',
        newTab: false,
        promotionPrevent: false,
        wallet: WALLET.SUB
      },
      {
        title: 'Number Game TP',
        imgSrc: require('~imageAsset/lobby/game-center-item/quickgame/numbersgametp.png'),
        loginRequired: true,
        gameUrl: '/tp-numbergame',
        provider: '',
        newTab: false,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'tp_number_game_url'
      }
    ],
    hasLobby: true
  },
  battle_games: {
    items: [
      {
        title: 'Cờ Úp',
        imgSrc: require('~imageAsset/lobby/game-center-item/battle/coup.jpg'),
        loginRequired: true,
        gameId: 'ktc7993',
        jackpot: true,
        provider: 'vingame',
        newTab: true,
        promotionPrevent: false,
        wallet: WALLET.SUB,
        gameType: 'gp_url'
      }
    ],
    hasLobby: false
  }
}
