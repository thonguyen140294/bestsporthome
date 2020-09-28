'use strict';
const tokenModel = require('../../shared/models/token');
const encodeDecode = require('../../shared/security/encodeDecode.security');

/**
 * @method GET
 * @path /test/encode
 * @param body
 * @return success message
 */
const encode = async (body) => {
    return {
        encode: await encodeDecode.encode(body.string)
    }
}

/**
 * @method GET
 * @path /test/decode
 * @param body
 * @return success message
 */
const decode = async (body) => {
    return {
        decode: await encodeDecode.decode(body.string)
    }
}

module.exports = {
    encode,
    decode
}