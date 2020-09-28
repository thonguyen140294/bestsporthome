const express = require('express')
const router = express.Router()
const _ = require('lodash')
const resHelper = require('../../shared/helpers/resHandle.helper');
const userHandler = require('../../core/user/user.handler');

/**
 * get profile
 */
router.route('/profile').get(async(req, res) => {
    try {
        let response = await userHandler.profile(res.locals);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
});

/**
 * update kyc
 */
router.route('/kyc').post(async(req, res) => {
    try {
        let response = await userHandler.kyc(res.locals, req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
});

/**
 * change password
 */
router.route('/change-password').post(async(req, res) => {
    try {
        let response = await userHandler.changePassword(res.locals, req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
});

/**
 * get cart
 */
router.route('/cart').get(async(req, res) => {
    try {
        let response = await userHandler.getCart(res.locals);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
});

/**
 * add to cart
 */
router.route('/cart').post(async(req, res) => {
    try {
        let response = await userHandler.addToCart(res.locals, req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
});

/**
 * remove cart
 */
router.route('/cart').delete(async(req, res) => {
    try {
        let response = await userHandler.removeFromCart(res.locals, req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
});

/**
 * update cart
 */
router.route('/cart').put(async(req, res) => {
    try {
        let response = await userHandler.updateCart(res.locals, req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
});

/**
 * get cart
 */
router.route('/cart/history').get(async(req, res) => {
    try {
        let response = await userHandler.getCartHistory(res.locals, req.query);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
});

/**
 * get cart
 */
router.route('/payment').post(async(req, res) => {
    try {
        let response = await userHandler.payment(res.locals, req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
});

module.exports = router