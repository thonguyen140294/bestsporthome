const _ = require('lodash');
const firebaseCommon = require('../../helpers/firebaseCommon.helper');
const appConstant = require('../../helpers/constant.helper')

const TABLE_MEMBER = appConstant.DATA_TABLE.MEMBER;
/**
 * schema
 * 
 * phone (string)
 * name (string)
 * password (string)
 * auth_code (string)
 * role (number)
 * status (number)
 * code_confirm (string)
 * language (string)
 * phone_confirmed (boolean)
 * is_locked (boolean)
 * created_at (number)
 * updated_at (number)
 */
const createUser = async (data) => {
    return await firebaseCommon.create(`${TABLE_MEMBER}`, data);
}

const findByPhone = async (phone) => {
    const queries = [{field: 'phone', compare: '==', value: phone}]
    const users = await firebaseCommon.queryTo(`${TABLE_MEMBER}`, queries)
    return users ? users[0] : null
}

const findById = async (id) => {
    return await firebaseCommon.read(`${TABLE_MEMBER}/${id}`)
}

const updateUser = async (id, data) => {
    return await firebaseCommon.update(`${TABLE_MEMBER}/${id}`, data)
}

const getListUser = async (query, pagination) => {
    let queries = []
    if(query && query.phone)queries.push({field: 'phone', compare: '==', value: query.phone})
    if(query && query.name)queries.push({field: 'name', compare: '==', value: query.name})
    const results = await firebaseCommon.queryPaginate(`${TABLE_MEMBER}`, null, pagination.limit, pagination.page)
    return results
}


module.exports = {
    createUser,
    findByPhone,
    findById,
    updateUser,
    getListUser
}