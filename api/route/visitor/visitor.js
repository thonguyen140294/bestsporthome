const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const productHandler = require('../../core/product/product.handler');
const categoryhandler = require('../../core/category/category.handler')
const brandHandler = require('../../core/brand/brand.handler')

/**
 * Get products
 */
router.route('/products').get(async (req, res) => {
    try {
        let response = await productHandler.get(req.header('locale'), req.query);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * Get product detail
 */
router.route('/product/detail/:product_id').get(async (req, res) => {
    try {
        let response = await productHandler.getDetail(req.header('locale'), req.params.product_id);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * Get recommended products
 */
router.route('/product/recommend/:product_id').get(async (req, res) => {
    try {
        let response = await productHandler.getRecommended(req.header('locale'), req.params.product_id, req.query);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * Get newest products
 */
router.route('/product/newest').get(async (req, res) => {
    try {
        let response = await productHandler.getNewest(req.header('locale'), req.query);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * Get sale products
 */
router.route('/product/sale').get(async (req, res) => {
    try {
        let response = await productHandler.getSale(req.header('locale'), req.query);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * Get categories
 */
router.route('/category').get(async (req, res) => {
    try {
        let response = await categoryhandler.getCategory()
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * Get brands
 */
router.route('/brand').get(async (req, res) => {
    try {
        let response = await brandHandler.getBrand()
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * Get brand by category
 */
router.route('/category/:category_id/brand').get(async (req, res) => {
    try {
        let response = await brandHandler.getBrandByCategory(req.params.category_id)
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

module.exports = router