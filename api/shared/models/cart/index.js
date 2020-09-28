const _ = require('lodash');
const moment = require('moment')
const appConstant = require('../../helpers/constant.helper')
const firebaseCommon = require('../../helpers/firebaseCommon.helper')
const TABLE_CART = appConstant.DATA_TABLE.CART
/**
 * schema
 * 
 * user (id)
 * products (array) [{ id, name, image, price, qty }]
 * status (number)
 * created_at (number)
 * updated_at (number)
 */
const createCart = async (data) => {
    return await firebaseCommon.create(`${TABLE_CART}`, data)
}

const getCartByUser = async (member) => {
    const queries = [{field: 'member', compare: '==', value: member},
                     {field: 'status', compare: '==', value: appConstant.CART.STATUS.NEW}]
    return await firebaseCommon.queryTo(`${TABLE_CART}`, queries)
}

const updateCart = async (id, data) => {
    await firebaseCommon.update(`${TABLE_CART}/${id}`, data) 
}

const removeCart = async (id) => {
    return firebaseCommon.remove(`${TABLE_CART}/${id}`)
}

const getCartHistoryByUser = async (member, query) => {
    const queries = [{field: 'member', compare: '==', value: member}]
    return await firebaseCommon.queryPaginate(`${TABLE_CART}`, queries, query.limit, query.page)
}

const getCartByUserAndStatus = async (member, status) => {
    const queries = [{field: 'member', compare: '==', value: member},{field: 'status', compare: '==', value: status}]
    return await firebaseCommon.queryTo(`${TABLE_CART}`, queries)
}


module.exports = {
    createCart,
    getCartByUser,
    updateCart,
    removeCart,
    getCartHistoryByUser,
    getCartByUserAndStatus
}