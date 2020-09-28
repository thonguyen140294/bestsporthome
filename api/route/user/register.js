const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const registerHandler = require('../../core/user/register.handler');

/**
 * Register new account
 */
router.route('/').post(async (req, res) => {
    try {
        let response = await registerHandler.register(res.locals);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

module.exports = router