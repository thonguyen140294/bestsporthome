const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const logoutHandler = require('../../core/logout/logout.handler');

/**
 * Logout
 */
router.route('/').post(async (req, res) => {
    try {
        let { tid, lang } = res.locals
        let response = await logoutHandler.logout(tid, lang);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

module.exports = router