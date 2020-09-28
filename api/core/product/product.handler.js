'use strict';
const productModel = require('../../shared/models/product')
const productDetailModel = require('../../shared/models/product_detail')
const validUtils = require('../../shared/helpers/validUtils.helper')

/**
 * @method GET
 * @path /
 * @param lang default is english
 * @param query
 * @return products
 */
const get = async (lang, query) => {
    const pagination = validUtils.paginationValidator(query)
    return await productModel.getProducts(query.category, pagination.limit, pagination.page)
}

/**
 * @method GET
 * @path /detail/:product_id
 * @param lang default is english
 * @param product_id
 * @return product
 */
const getDetail = async (lang, product_id) => {
    const product = await productModel.getProductById(product_id)
    if(!product){
        throw Error('Product is not found')
    }
    product.detail = await productDetailModel.getProductDetailById(product_id)
    return product
}

/**
 * @method GET
 * @path /recommend/:product_id
 * @param lang default is english
 * @param product_id
 * @param query
 * @return products
 */
const getRecommended = async (lang, product_id, query) => {
    const pagination = validUtils.paginationValidator(query)
}

/**
 * @method GET
 * @path /newest
 * @param lang default is english
 * @param query
 * @return products
 */
const getNewest = async (lang, query) => {
    const pagination = validUtils.paginationValidator(query)
    return await productModel.getNewestProducts(pagination.limit, pagination.page)
}

/**
 * @method GET
 * @path /sale
 * @param lang default is english
 * @param query
 * @return products
 */
const getSale = async (lang, query) => {
    const pagination = validUtils.paginationValidator(query)
}

module.exports = {
    get,
    getDetail,
    getRecommended,
    getNewest,
    getSale
}