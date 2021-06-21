const apiVersion = process.env.API_VER

const LOBBY_GAME_API = {
  LIST: `${apiVersion}/lobby`,
  JACKPOT: `${apiVersion}/slot/jackpot`
}

module.exports = LOBBY_GAME_API
