const express = require('express')
const router = express.Router()
const _ = require('lodash');

const resHelper = require('../../shared/helpers/resHandle.helper');
const loginHandler = require('../../core/user/login.handler');
const appConstant = require('../../shared/helpers/constant.helper')
/**
 * Login by phone
 */
router.route('/').post(async (req, res) => {
    try {
        let userAgent = res.locals.userAgent;
        let requestIp = res.locals.ip;
        let data = { userAgent, requestIp }
        let response = await loginHandler.login(res.locals, data, appConstant.USER.ROLE.USER);
        resHelper.sendResponse(res, response);
    } catch (error) {
        console.log(error)
        resHelper.sendError(res, error);
    }
})

/**
 * Login by phone
 */
router.route('/admin').post(async (req, res) => {
    try {
        let userAgent = res.locals.userAgent;
        let requestIp = res.locals.ip;
        let data = { userAgent, requestIp }
        let response = await loginHandler.login(res.locals, data, appConstant.USER.ROLE.ADMIN);
        resHelper.sendResponse(res, response);
    } catch (error) {
        console.log(error)
        resHelper.sendError(res, error);
    }
})

module.exports = router