'use strict';
const _ = require('lodash')
const contactModel = require('../../shared/models/contact');

/**
 * @method POST
 * @path /logout
 * @param uid
 * @param lang default is english
 * @return success message
 */
const send = async (lang, body) => {
    await contactModel.create(_.pick(body, ['name', 'email','title', 'content']))
    return {
        message: 'Successfully'
    }
}

module.exports = {
    send
}