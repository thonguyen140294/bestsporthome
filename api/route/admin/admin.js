const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const adminHandler = require('../../core/admin/admin.handler');

// Get list users
router.route('/view/users').get(async (req, res) => {
    try {
        let response = await adminHandler.getUsers(res.locals, req.query);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

// Get list products
router.route('/view/products').get(async (req, res) => {
    try {
        let response = await adminHandler.getProducts(res.locals, req.query);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

// create product
router.route('/product').post(async (req, res) => {
    try {
        let response = await adminHandler.addProduct(res.locals, req.body);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

// update product
router.route('/product/:product_id').put(async (req, res) => {
    try {
        let response = await adminHandler.addProduct(res.locals, req.params.product_id, req.body);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

// Get list orders
router.route('/view/orders').get(async (req, res) => {
    try {
        let response = await adminHandler.getOrders(res.locals, req.query);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})
// Get order detail
router.route('/view/order/:order_id').get(async (req, res) => {
    try {
        let response = await adminHandler.getOrders(res.locals, req.params.order_id);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})
// Get order detail
router.route('/order/:order_id').put(async (req, res) => {
    try {
        let response = await adminHandler.getOrders(res.locals, req.params.order_id);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

module.exports = router