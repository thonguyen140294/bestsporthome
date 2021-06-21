import { IFRAME_GAME_URLS } from '@/config/page-url'

const {
  LIVE_SPORTS,
  VIRTUAL_SPORTS,
  ESPORTS,
  LIVE_CASINO,
  VIRTUAL_GAME,
  SABA_CLUB,
  NUMBER_GAME,
  TP_NUMBER_GAME,
  KENO,
  TP_KENO,
  LOTTERY_CYBER_PUNK,
  LOTTERY_LAS_VEGAS,
  TABLE_GAMES,
  LODE,
  LODE_SIEUTOC,
  C_SPORT,
  LOTTERY
} = IFRAME_GAME_URLS

export const mappingIframeGames = {
  [LIVE_SPORTS]: {
    height: '916px'
  },
  [VIRTUAL_SPORTS]: {
    height: '916px'
  },
  [ESPORTS]: {
    height: '916px'
  },
  [LIVE_CASINO]: {
    height: '916px'
  },
  [VIRTUAL_GAME]: {
    height: '916px'
  },
  [TABLE_GAMES]: {
    height: '885px'
  },
  [LODE]: {
    height: '885px'
  },
  [LODE_SIEUTOC]: {
    height: '885px'
  },
  [SABA_CLUB]: {
    height: '885x'
  },
  [NUMBER_GAME]: {
    height: '950px'
  },
  [TP_NUMBER_GAME]: {
    height: '916px'
  },
  [KENO]: {
    height: '1921px'
  },
  [TP_KENO]: {
    height: '1921px'
  },
  [LOTTERY_LAS_VEGAS]: {
    height: '768px'
  },
  [LOTTERY_CYBER_PUNK]: {
    height: '768px'
  },
  [LOTTERY]: {
    height: '916px'
  },
  [C_SPORT]: {
    height: '916px'
  }
}
