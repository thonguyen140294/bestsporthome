'use strict';
const _ = require('lodash');
const appConstant = require('../../shared/helpers/constant.helper');
const fileHandle = require('../../shared/helpers/fileHandle.helper');
const passwordManagement = require('../../shared/security/passGenerator.security');
const userModel = require('../../shared/models/user');
const encodeDecode = require('../../shared/security/encodeDecode.security')
const productModel = require('../../shared/models/product')
const cartModel = require('../../shared/models/cart')

/**
 * @method GET
 * @path /user/profile
 * @param lang default is english
 * @param uid
 * @return user infor
 */
const profile = async (locals) => {
    const user = await userModel.findById(locals.uid)
    if(!user){
        throw Error('Account is not found')
    }
    const carts = await cartModel.getCartByUserAndStatus(locals.uid, appConstant.CART.STATUS.PAYMENT)
    user.exp = _.reduce(carts, (sum, cart) => {
        return sum + (cart.status === appConstant.CART.STATUS.PAYMENT ? cart.product.price*cart.qty : 0)
    }, 0)
    for(let i of Object.keys(appConstant.USER.RANKING)){
        if(appConstant.USER.RANKING[i] > user.exp){
            user.next_exp = appConstant.USER.RANKING[i]
            break
        }
        user.ranking = i
    }
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
    body = _.pick(body, ['address', 'avatar', 'email', 'birthday', 'gender', 'zip_code', 'phone'])
    if(body.avatar){
        let image = body.avatar.split(',')
        let extension = image[0].split(';')[0].split('/')[1]
        let name = `${locals.uid}`
        body.avatar = await fileHandle.uploadToFirebase('members', name, extension, image[1])
    }
    await userModel.updateUser(locals.uid, body);
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
    body.password = encodeDecode.decode(body.password)
    body.new_password = encodeDecode.decode(body.new_password)
    if(body.password === body.new_password){
        throw Error('Password is in use')
    }
    if(user.password !== passwordManagement.hashPasswordMd5(body.password)){
        throw Error('Password incorrect')
    }
    await userModel.updateUser(locals.uid, {password: passwordManagement.hashPasswordMd5(body.password)})
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
    return await cartModel.getCartByUser(locals.uid)
}

/**
 * @method POST
 * @path /user/cart
 * @param locals
 * @param body
 * @return success message
 */
const addToCart = async (locals, body) => {
    const product = await productModel.getProductById(body.product_id)
    if(!product){
        throw Error('Profuct is not found')
    }
    const carts = await cartModel.getCartByUser(locals.uid)
    if(!_.isEmpty(carts)){
        for(let cart of carts){
            if(cart.product.id === body.product_id){
                await cartModel.updateCart(cart.id, {qty: cart.qty+body.qty})
                return {
                    message: 'Successfully'
                }
            }
        }
    }
    await cartModel.createCart({
        member: locals.uid,
        product: _.pick(product, ['name', 'image', 'price', 'id']),
        qty: body.qty,
        status: appConstant.CART.STATUS.NEW
    })
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
    const cart = await cartModel.getCartByUser(locals.uid)
    if(cart){
        cart.products = _.filter(cart.products, p => p.id !== body.product_id)
        await cartModel.updateCart(cart.id, _.pick(cart, ['products']))
    }
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
    await cartModel.updateCart(body.cart_id, {qty: body.qty})
    const cart = await cartModel.getCartByUser(locals.uid)
    if(cart){
        cart.products = _.map(cart.products, p => {
            if(p.id === body.product_id)p.qty = body.qty
            return p
        })
        await cartModel.updateCart(cart.id, _.pick(cart, ['products']))
    }
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
    return await cartModel.getCartHistoryByUser(locals.uid, query)
}

/**
 * @method POST
 * @path /user/payment
 * @param locals
 * @param body
 * @return success message
 */
const payment = async (locals, body) => {
    const carts = await cartModel.getCartByUser(locals.uid)
    const user = await userModel.findById(locals.uid)
    for(let cart of carts){
        await cartModel.updateCart(cart.id, {
            payment:{
                name: body.name || user.name,
                phone: body.phone || user.phone,
                address: body.address || user.address,
                note: body.note
            },
            status: appConstant.CART.STATUS.PROCESSING
        })
    }
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