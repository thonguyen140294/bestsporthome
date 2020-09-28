const _ = require('lodash');
const moment = require('moment')
const appConstant = require('../../helpers/constant.helper')
const firebaseCommon = require('../../helpers/firebaseCommon.helper')
const TABLE_TOKEN = appConstant.DATA_TABLE.TOKEN
/**
 * schema
 * 
 * member (id)
 * token (string)
 * refresh_token (string)
 * created_at (number)
 * updated_at (number)
 */
const createToken = async (data) => {
    return await firebaseCommon.create(`${TABLE_TOKEN}`, data)
}

const findByMember = async (token) => {
    const queries = [{field: 'token', compare: '==', value: token}]
    const tokens = await firebaseCommon.queryTo(`${TABLE_TOKEN}`, queries)
    return tokens ? tokens[0] : null
}

const removeTokenByUser = async (member_id) => {
    return 
}

const findById = async (id) => {
    return 
}

const updateToken = async (id, data) => {
    await firebaseCommon.update(`${TABLE_TOKEN}/${id}`, data) 
}

const removeExpiredToken = async (id) => {
    return 
}

const countTokenByUser = async (member_id) => {
    return 
}

const removeToken = async (id) => {
    return await firebaseCommon.remove(`${TABLE_TOKEN}/${id}`) 
}


module.exports = {
    createToken,
    findByMember,
    findById,
    updateToken,
    removeExpiredToken,
    countTokenByUser,
    removeToken,
    removeTokenByUser
}