const express = require('express')
const router = express.Router()
const _ = require('lodash')
const resHelper = require('../../shared/helpers/resHandle.helper');
const loginHandler = require('../../core/user/login.handler');
const registerHandler = require('../../core/user/register.handler');

/**
 * Login by phone
 */
router.route('/login').post(async (req, res) => {
    try {
        let userAgent = res.locals.userAgent;
        let requestIp = res.locals.ip;
        let data = { userAgent, requestIp }
        let response = await loginHandler.login(res.locals, data);
        resHelper.sendResponse(res, response);
    } catch (error) {
        console.log(error)
        resHelper.sendError(res, error);
    }
})

/**
 * Register new account
 */
router.route('/register').post(async (req, res) => {
    try {
        let response = await registerHandler.register(res.locals);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

module.exports = router