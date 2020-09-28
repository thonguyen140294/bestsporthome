'use strict';
const tokenModel = require('../../shared/models/token');
const localsUtil = require('../../shared/helpers/localesUtils.helper');

/**
 * @method POST
 * @path /logout
 * @param uid
 * @param lang default is english
 * @return success message
 */
const logout = async (tokenId, lang) => {
    await tokenModel.removeToken(tokenId)
    return {
        message: 'Successfully'
    }
}

module.exports = {
    logout
}