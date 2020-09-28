const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const forgotPasswordHandler = require('../../core/user/forgot_password.handler');

/**
 * send code to reset password
 */
router.route('/code').post(async (req, res) => {
    try {
        let response = await forgotPasswordHandler.sendCode(locals.lang, req.body.phone);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * reset password
 */
router.route('/reset/:code').post(async (req, res) => {
    try {
        let response = await forgotPasswordHandler.reset(locals.lang, req.params.code, req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

module.exports = router