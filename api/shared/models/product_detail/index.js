const _ = require('lodash');
const firebaseCommon = require('../../helpers/firebaseCommon.helper');
const appConstant = require('../../helpers/constant.helper')

const TABLE_PRODUCT_DETAIL = appConstant.DATA_TABLE.PRODUCT_DETAIL;
/**
 * schema
 * 
 * product (id)
 * desc (string)
 * images (array) string
 * sizes (array) string
 * versions (array) { price, name }
 * status (number)
 * created_at (number)
 * updated_at (number)
 */
const getProductDetailById = async (id) => {
    const queries = [{field: 'product', compare: '==', value: id}]
    const product_details =  await firebaseCommon.queryTo(`${TABLE_PRODUCT_DETAIL}`, queries);
    return product_details ? product_details[0] : null
}

const createDetail = async (data) => {
    return await firebaseCommon.create(`${TABLE_PRODUCT_DETAIL}`, data)
}

module.exports = {
    getProductDetailById,
    createDetail
}