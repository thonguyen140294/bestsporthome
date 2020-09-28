const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const loginHandler = require('../../core/user/login.handler');

/**
 * 
 */
router.route('/').post(async (req, res) => {
    try {
        let body = req.body
        let response = await loginHandler.verifyLogin(res.locals, body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

module.exports = router