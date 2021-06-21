export const refineJackpotData = (jackpotObj) => {
  const storeJackpot = {}
  const listGame = Object.keys(jackpotObj)
  listGame.forEach((gameId) => {
    let jackpotVal = 0
    switch (gameId) {
      case 'ktmn_5999':
        jackpotVal = Math.ceil(jackpotObj.ktmn_5999.PLT_JACKPOT_50)
        break
      case 'kts_9984':
        if (jackpotObj[gameId].MDAO_JP_1_GRAND) {
          jackpotVal = Math.ceil(jackpotObj[gameId].MDAO_JP_1_GRAND)
        }
        break
      case 'kts_9985':
        if (jackpotObj[gameId].TWITCHER_JP_GRAND) {
          jackpotVal = Math.ceil(jackpotObj[gameId].TWITCHER_JP_GRAND)
        }
        break
      case 'kts_9987':
        if (jackpotObj[gameId].FDRAGON_JP_1_GRAND) {
          jackpotVal = Math.ceil(jackpotObj[gameId].FDRAGON_JP_1_GRAND)
        }
        break
      case 'kts_9988':
        if (jackpotObj[gameId].AICAP_JP_5_GRAND) {
          jackpotVal = Math.ceil(jackpotObj[gameId].AICAP_JP_5_GRAND)
        }
        break
      case 'kts_9995':
        jackpotVal = Math.ceil(jackpotObj[gameId].TayDu_JP_7_GRAND)
        break
      case 'kts_9993':
        jackpotVal = Math.ceil(jackpotObj[gameId].TThu_JP_7_GRAND)
        break
      case 'kts_9997':
        jackpotVal = Math.ceil(jackpotObj[gameId].ThangBom_JP_6_GRAND)
        break
      case 'kts_9999':
        jackpotVal = Math.ceil(jackpotObj[gameId].STTT_JACKPOT_500)
        break
      case 'kts_9998':
        jackpotVal = Math.ceil(jackpotObj[gameId].AKTV_JP_400_GRAND)
        break
      case 'kts_9996':
        jackpotVal = Math.ceil(jackpotObj[gameId].BDMN_JP_500_GRAND)
        break
      case 'ktf_1997':
        jackpotVal = Math.ceil(jackpotObj[gameId].TPDD1997_JP_GRAND)
        break
      case 'ktf_1998':
        jackpotVal = Math.ceil(jackpotObj[gameId].F1998_JP_GRAND)
        break
      case 'ktf_1999':
        jackpotVal = Math.ceil(jackpotObj[gameId].TPDD1999_JP_GRAND)
        break
      case 'kts_9992':
        jackpotVal = Math.ceil(jackpotObj[gameId].TQ_JP_7_GRAND)
        break
      case 'kts_9991':
        jackpotVal = Math.ceil(jackpotObj[gameId].TL_JP_6_GRAND)
        break
      case 'kts_9994':
        jackpotVal = Math.ceil(jackpotObj.kts_9991.TL_JP_5_GRAND)
        break
      case 'kts_9989':
        jackpotVal = Math.ceil(jackpotObj[gameId].SWAR_JP_6_GRAND)
        break
      case 'kts_9990':
        jackpotVal = Math.ceil(jackpotObj[gameId].XMAS_JP_6_GRAND)
        break
      case 'kts_9982':
        jackpotVal = Math.ceil(jackpotObj[gameId].FBALL_JP_5_GRAND)
        break
      case 'kts_9980':
        jackpotVal = Math.ceil(jackpotObj[gameId].THLQ_JP_3_GRAND)
        break
      case 'kts_9977':
        jackpotVal = Math.ceil(jackpotObj[gameId].MGEAR_JP_5_GRAND)
        break
      case 'kts_9979':
        jackpotVal = Math.ceil(jackpotObj[gameId].COWar_JP_5_GRAND)
        break
      case 'kts_9976':
        jackpotVal = Math.ceil(jackpotObj[gameId].ALADDIN_JP_3_GRAND)
        break
      case 'kts_9975':
        jackpotVal = Math.ceil(jackpotObj[gameId].TThu_JP_6_GRAND)
        break
      case 'kts_9974':
        jackpotVal = Math.ceil(jackpotObj[gameId].CR_JP_6_GRAND)
        break
      default:
        break
    }
    storeJackpot[gameId.replace('_', '')] = jackpotVal
  })
  return storeJackpot
}
