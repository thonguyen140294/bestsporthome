const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const contactHandler = require('../../core/contact/contact.handler');

/**
 * contact
 */
router.route('/').post(async (req, res) => {
    try {
        let response = await contactHandler.send(req.header('locale'), req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

module.exports = router