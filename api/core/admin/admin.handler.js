'use strict';
const _ = require('lodash');
const moment = require('moment')
const userModel = require('../../shared/models/user')
const localeUtils = require('../../shared/helpers/localesUtils.helper')
const appConstant = require('../../shared/helpers/constant.helper')
const validUtils = require('../../shared/helpers/validUtils.helper')
const productDetailModel = require('../../shared/models/product_detail')
const productModel = require('../../shared/models/product')
const fileHandle = require('../../shared/helpers/fileHandle.helper');
const categoryModel = require('../../shared/models/category')

/**
 * @method GET
 * @path /admin/view/users
 * @param locals
 * @param query
 * @return success message
 */
const getUsers = async (locals, query) => {
    const pagination = validUtils.paginationValidator(query)
    return await userModel.getListUser(_.pick(query, ['phone', 'name']), pagination)
}

/**
 * @method GET
 * @path /admin/view/users
 * @param locals
 * @param query
 * @return success message
 */
const getProducts = async (locals, query) => {
    const pagination = validUtils.paginationValidator(query)
    return await productModel.getProducts(pagination.limit, pagination.page)
}

/**
 * @method POST
 * @path /admin/product
 * @param lang default is english
 * @param uid
 * @param id
 * @return success message
 */
const addProduct = async (locals, body) => {
    const category = await categoryModel.getCategoryById(body.category)
    if(!category){
        throw Error('Category is not found')
    }
    if(body.image){
        let image = body.image.split(',')
        let extension = image[0].split(';')[0].split('/')[1]
        let name = `${body.name}${moment().valueOf()}`
        body.image = await fileHandle.uploadToFirebase('products', name, extension, image[1])
    }
    const product_id = await productModel.createProduct(_.pick(body, ['name', 'price', 'category', 'sale', 'image']))
    if(body.detail.images){
        for(let i in body.detail.images){
            let base64 = body.detail.images[i]
            let image = base64.split(',')
            let extension = image[0].split(';')[0].split('/')[1]
            let name = `${body.name}${moment().valueOf()}`
            body.detail.images[i] = await fileHandle.uploadToFirebase('products', name, extension, image[1])
        }
    }
    body.detail.product = product_id
    await productDetailModel.createDetail(_.pick(body.detail, ['product', 'desc', 'images', 'sizes', 'types']))
    return {
        message: 'successfully'
    }
}

/**
 * @method POST
 * @path /admin/product
 * @param body
 * @return success message
 */
const addCategory = async (locals, body) => {
    const category = await categoryModel.getCategoryByName(body.name)
    if(category){
        throw Error('Category is exist')
    }
    await categoryModel.createCategory(_.pick(body, ['name']))
    return {
        message: 'successfully'
    }
}

module.exports = {
    getUsers,
    getProducts,
    addProduct,
    addCategory
}