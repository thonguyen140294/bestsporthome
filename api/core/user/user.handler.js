'use strict';
const _ = require('lodash');
const appConstant = require('../../shared/helpers/constant.helper');
const passwordManagement = require('../../shared/security/passGenerator.security');
const userModel = require('../../shared/models/user');
const encodeDecode = require('../../shared/security/encodeDecode.security')
const cartModel = require('../../shared/models/cart')

/**
 * @method GET
 * @path /user/profile
 * @param lang default is english
 * @param uid
 * @return user infor
 */
const profile = async (locals) => {
    return _.pick(user, ['name', 'phone', 'address', 'level', 'status', 'avatar', 'email', 'zip_code', 'birthday', 'gender', 'exp', 'next_exp', 'ranking'])
}

/**
 * @method POST
 * @path /user/kyc
 * @param lang default is english
 * @param uid
 * @param body
 * @return success message
 */
const kyc = async (locals, body) => {
    return {
        message: 'Successfully'
    }
}

/**
 * @method POST
 * @path /user/change-password
 * @param locals
 * @param body
 * @return success message
 */
const changePassword = async (locals, body) => {
    return {
        message: 'Successfully'
    }
}

/**
 * @method GET
 * @path /user/cart
 * @param locals
 * @return success message
 */
const getCart = async (locals) => {
}

/**
 * @method POST
 * @path /user/cart
 * @param locals
 * @param body
 * @return success message
 */
const addToCart = async (locals, body) => {
    return {
        message: 'Successfully'
    }
}

/**
 * @method DELETE
 * @path /user/cart
 * @param locals
 * @param body
 * @return success message
 */
const removeFromCart = async (locals, body) => {
    return {
        message: 'Successfully'
    }
}

/**
 * @method PUT
 * @path /user/cart
 * @param locals
 * @param body
 * @return success message
 */
const updateCart = async (locals, body) => {
    return {
        message: 'Successfully'
    }
}

/**
 * @method GET
 * @path /user/cart/history
 * @param locals
 * @return success message
 */
const getCartHistory = async (locals, query) => {
}

/**
 * @method POST
 * @path /user/payment
 * @param locals
 * @param body
 * @return success message
 */
const payment = async (locals, body) => {
    return {
        message: 'Thành công, Cửa hàng sẽ duyệt thông tin và liên lạc với bạn để xác nhận. Cảm ơn bạn lựa chọn cửa hàng chúng tôi'
    }
}

module.exports = {
    profile,
    kyc,
    changePassword,
    getCart,
    addToCart,
    removeFromCart,
    updateCart,
    getCartHistory,
    payment
}