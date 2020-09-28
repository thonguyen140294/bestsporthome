const configCommon = require('../helpers/configCommon.helper');
const crypto = require('crypto-js');

const encode = async (content) => {
    return await crypto.AES.encrypt(content, configCommon.getEncodeDecode().key).toString();
}

const decode = async (content) => {
    return await crypto.AES.decrypt(content, configCommon.getEncodeDecode().key).toString(crypto.enc.Utf8);
}

module.exports = {
    encode,
    decode
}
