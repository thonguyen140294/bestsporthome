const apiVersion = process.env.API_VER

const LOBBY_GAME_API = {
  LIST: `${apiVersion}/lobby`,
  JACKPOT: `${apiVersion}/slot/jackpot`
}

const CASINO_API = {
  LIST: `${apiVersion}/casino`
}

const COMMON_LOBBY_API = {
  TURNOVER: '/games/highest-monthly-turn-over'
}

module.exports = { LOBBY_GAME_API, CASINO_API, COMMON_LOBBY_API }
