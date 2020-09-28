const _ = require('lodash');
const firebaseCommon = require('../../helpers/firebaseCommon.helper');
const appConstant = require('../../helpers/constant.helper')

const TABLE_PRODUCT = appConstant.DATA_TABLE.PRODUCT;
/**
 * schema
 * 
 * name (string)
 * category (id)
 * brand (id)
 * price (number)
 * sale (number)
 * image (string)
 * season (number)
 * status (number)
 * created_at (number)
 * updated_at (number)
 */
const getProducts = async (category, limit, page) => {
    const queries = []
    if(category)queries.push({field: 'category', compare: '==', value: category})
    return await firebaseCommon.queryPaginate(`${TABLE_PRODUCT}`, null, limit, page);
}

const getNewestProducts = async (limit, page) => {
    return await firebaseCommon.queryPaginate(`${TABLE_PRODUCT}`, null, limit, page)
}
const getProductById = async (id) => {
    return await firebaseCommon.read(`${TABLE_PRODUCT}/${id}`);
}

const createProduct = async (data) => {
    return await firebaseCommon.create(`${TABLE_PRODUCT}`, data);
}


module.exports = {
    getProducts,
    getNewestProducts,
    getProductById,
    createProduct
}