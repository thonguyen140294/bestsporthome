const firebaseCommon = require('../../helpers/firebaseCommon.helper')
const appConstant = require('../../helpers/constant.helper')
const TABLE_SIGIN_HISTORY = appConstant.DATA_TABLE.SIGNIN_HISTORY
/**
 * schema
 * 
 * member (id)
 * ip (string)
 * ua (string)
 * created_at (number)
 * updated_at (number)
 */
const createHistory = async (data) => {
    return await firebaseCommon.create(`${TABLE_SIGIN_HISTORY}`, data)
}

const getHistoryByMember = async (member_id, pagination) => {
    return
}

module.exports = {
    createHistory,
    getHistoryByMember,
}