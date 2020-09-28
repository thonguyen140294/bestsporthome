const configCommon = require('../helper/config');
const crypto = require('crypto-js');

const encode = async (content) => {
    return await crypto.AES.encrypt(content, configCommon.default.getEncodeDecodeKey().key).toString();
}

const decode = async (content) => {
    return await crypto.AES.decrypt(content, configCommon.default.getEncodeDecodeKey().key).toString(crypto.enc.Utf8);
}

export default {
    encode,
    decode
}
