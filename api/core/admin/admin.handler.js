'use strict';
const _ = require('lodash');
const userModel = require('../../shared/models/user')
const validUtils = require('../../shared/helpers/validUtils.helper')

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