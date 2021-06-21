import { LOBBY_GAME_URLS } from '@/config/page-url'

export const getDomainUrl = (path) => {
  const url = process.env.MU_DOMAIN
  return url ? encodeURI(url + path) : url
}
export const getLodeUrl = (user, isMobile = false) => {
  const gptoken = user?.gptoken
  return isMobile ? `${process.env.LODE_MOBILE_URL}${gptoken}` : `${process.env.LODE_URL}${gptoken}`
}

export const getLodeSieuTocUrl = (user, isMobile = false) => {
  const gptoken = user?.gptoken
  return isMobile ? `${process.env.LODE_SIEUTOC_MOBILE_URL}${gptoken}` : `${process.env.LODE_SIEUTOC_URL}${gptoken}`
}

export const getKenoUrl = (user, isMobile = false) => {
  const gptoken = user?.gptoken ? `${user.gptoken ? `&token=${user.gptoken}` : ''}` : ''
  const kenoUrl = process.env.TP_KENO_URL
  if (isMobile) {
    return `${kenoUrl}?operator_id=2000&lang=vi&currency=VND&is_mobile=1${gptoken}`
  }
  return `${kenoUrl}?operator_id=2000&lang=vi&currency=VND${gptoken}`
}

export const getTpNumberGameUrl = (user, isMobile = false) => {
  const gptoken = user?.gptoken || ''
  const tpNumberGameUrl = process.env.TP_NUMBERGAME_URL
  if (isMobile) {
    return `${tpNumberGameUrl}?operator_id=1000&lang=vi&currency=VND&is_mobile=1&token=${gptoken}`
  }
  return `${tpNumberGameUrl}?operator_id=1000&lang=vi&currency=VND&token=${gptoken}`
}

export const getGpUrl = (user, gameId) => {
  const gptoken = user?.gptoken || ''
  const gameUrl = `${process.env.GP_URL}/${gameId.replace('_', '')}/?token=${gptoken}`
  let returnUrl = ''

  const gameBanCa = ['ktf_1999', 'ktf_1997', 'ktf1998']
  const gameInGame = ['ktrng_3992', 'ktrng_3998', 'ktrng_3999', 'ktrng_3997',
    'ktrng_3991', 'ktrng_3994', 'ktrng_3989', 'ktrng_3988', 'ktrng3986', 'ktrng3985']
  const gameBattle = ['ktc7993']

  if (gameBanCa.includes(gameId)) {
    returnUrl = getDomainUrl(LOBBY_GAME_URLS.FISHING)
  } else if (gameInGame.includes(gameId)) {
    returnUrl = getDomainUrl(LOBBY_GAME_URLS.INGAME)
  } else if (gameBattle.includes(gameId)) {
    returnUrl = getDomainUrl(LOBBY_GAME_URLS.BATTLE_GAMES)
  } else {
    returnUrl = getDomainUrl(LOBBY_GAME_URLS.SLOT)
  }
  return `${gameUrl}&ru=${returnUrl}`
}

export const getInstantGameUrl = ({ username, gptoken }, gameId) => {
  const currentTime = (new Date()).getTime()
  let gameUrl = ''
  if (gptoken) {
    const returnUrl = window.location.href || getDomainUrl(LOBBY_GAME_URLS.INSTANT_GAMES)
    gameUrl = `${process.env.INSTANT_GAME_URL}${gameId}?lang=VI&currency=VND&operator=proadvancepowerasia&token=${gptoken}-${currentTime}&user=mu9_${username.toLowerCase()}&return_url=${returnUrl}`
  }
  return gameUrl
}

export const getLotteryCyberPunkUrl = (user, isValidPlan) => {
  const gptoken = user?.gptoken || ''
  return isValidPlan ? `${process.env.QUAYSO_CYPER_URL}?token=${gptoken}` : `${process.env.QUAYSO_LAS_VEGAS_URL}?token=${gptoken}`
}

export const getLotteryLasVegasUrl = (user) => {
  const gptoken = user?.gptoken || ''
  return `${process.env.QUAYSO_LAS_VEGAS_URL}?token=${gptoken}`
}

export const getPGSoftUrl = (user, gameCode) => {
  const gptoken = user?.gptoken || ''
  return `${process.env.PG_SOFT_URL}${gameCode}/index.html?operator_token=${process.env.PG_SOFT_TOKEN}&operator_player_session=${gptoken}&language=vi&bet_type=1`
}

export const getGameBaiUrl = (user, gameId) => {
  const returnUrl = window.location.href || 'https://mu9.com'
  const gptoken = user?.gptoken || ''
  return `${process.env.GAMEBAI_URL}?token=${gptoken}&brand=mu9&home_url=https://mu9.com&return_url=${returnUrl}&gameid=${gameId}`
}
