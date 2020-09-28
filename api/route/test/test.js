const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const testHandler = require('../../core/test/test.handler');

/**
 * Encode
 */
router.route('/encode').post(async (req, res) => {
    try {
        let response = await testHandler.encode(req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * Decode
 */
router.route('/decode').post(async (req, res) => {
    try {
        let response = await testHandler.decode(req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

module.exports = router